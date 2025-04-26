import type { Metadata } from "next";
import "../css/global.css";

export const metadata: Metadata = {
  title: "Currency Converter | Lintify Inc. Task",
  description:
    "A simple and responsive currency converter web application built with Next.js and TypeScript. It allows users to convert between different currencies in real-time. Designed as part of the Lintify Inc. task.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
