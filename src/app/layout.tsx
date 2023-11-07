import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "look Memes",
  description: "NFT look Memes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
