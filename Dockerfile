# syntax=docker.io/docker/dockerfile:1

FROM node:lts-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package manifest and yarn lockfile
COPY package.json yarn.lock ./

# Install dependencies with yarn (respecting lockfile)
RUN yarn install --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM base AS builder

ENV NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG BROWSER_ENDPOINT
ARG REPORTS_ENDPOINT
ENV BROWSER_ENDPOINT=$BROWSER_ENDPOINT
ENV REPORTS_ENDPOINT=$REPORTS_ENDPOINT

# Build Next.js app
RUN yarn build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
