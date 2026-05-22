import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Documentation — Valendata",
  description: "Valendata developer documentation. Skills, Workflows, Credits, and Billing.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=20", type: "image/x-icon" },
      { url: "/images/ValendataX.png?v=20", sizes: "32x32", type: "image/png" },
      { url: "/images/ValendataX.png?v=20", sizes: "192x192", type: "image/png" },
      { url: "/images/ValendataX.png?v=20", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=20",
    apple: "/images/ValendataX.png?v=20",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
