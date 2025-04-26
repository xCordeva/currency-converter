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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* setting the theme on server to be shown on render without the flashing that happens if its set via useEffect */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('theme');
                  var theme = storedTheme === 'dark' ? 'dark' : 'light';
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
