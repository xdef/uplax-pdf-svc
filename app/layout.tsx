import * as React from "react";

import type { Metadata } from "next";
import Layout from "@/components/Layout";
import { createTheme, MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import "./globals.css";

const theme = createTheme({
  /** Put your mantine theme override here */
  primaryColor: "dark",
});

export const metadata: Metadata = {
  title: "Uplax",
  description: "Просмотр и печать документов в формате PDF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <MantineProvider theme={theme}>
          <Layout>{children}</Layout>
        </MantineProvider>
      </body>
    </html>
  );
}
