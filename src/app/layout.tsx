import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import { LayoutShell } from "@/components/layout/LayoutShell";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Elegancybyabby | Redefining Beauty",
  description: "Hair accessories & hypoallergenic jewelry store. Next day delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} antialiased`}>
      <body className="font-[family-name:var(--font-space-grotesk)]">
        <ToastProvider>
          <LayoutShell>{children}</LayoutShell>
        </ToastProvider>
      </body>
    </html>
  );
}
