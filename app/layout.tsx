import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Documentation — Valendata",
  description: "Valendata developer documentation. Skills, Workflows, Credits, and Billing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
