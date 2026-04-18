# syntax=docker.io/docker/dockerfile:1

FROM node:lts-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy root package.json and lockfile
COPY package.json package-lock.json* ./

# Copy the SITE package.json
COPY package.json ./package.json

RUN npm ci

# 2. Rebuild the source code only when needed
FROM base AS builder

ENV NODE_ENV=production

ARG BROWSER_ENDPOINT
ARG REPORTS_ENDPOINT

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN cat > .env.production <<EOF
BROWSER_ENDPOINT=${BROWSER_ENDPOINT}
REPORTS_ENDPOINT=${REPORTS_ENDPOINT}
EOF

RUN npm install -g corepack
RUN npm run build --  --filter=@irost/pdf

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs .next/standalone ./
COPY --from=builder --chown=nextjs:nodejs .next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD HOSTNAME="0.0.0.0" node server.js
