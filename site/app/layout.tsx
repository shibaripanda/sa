import "@mantine/core/styles.css";
import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../theme";
import './globals.css'
import { Inter } from 'next/font/google'
import * as fs from 'fs';
import { getLenguagesFromAI } from "../utils/lengPackUpdate";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700'],
  display: 'swap',
})

// export const metadata = {
//   title: "Mantine Next.js template",
//   description: "I am using Mantine with Next.js!",
// };

export default function RootLayout({ children }: { children: any }) {

  // getLenguagesFromAI()

  return (
    <html lang="en" {...mantineHtmlProps} className={inter.variable}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
            {children}
        </MantineProvider>
      </body>
    </html>
  );
}
