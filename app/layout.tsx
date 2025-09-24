import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/custom/RootLayout";
import { Toast } from "@/components/ui";
//import { isUndefined } from "util";

export const metadata: Metadata = {
  title: "Ciluna",
  description: "Ciluna",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </head>

      <body className={`mx-auto flex flex-col font-inter bgcolor`}>
        <Toast richColors position="top-right" />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
