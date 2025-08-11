import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/custom/RootLayout";
import { Toast } from "@/components/ui";
import { getAllCategories } from "@/actions/categories/category";
//import { isUndefined } from "util";

export const metadata: Metadata = {
  title: "Ciluna Marketplace",
  description: "Ciluna Marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categoriesResponse = await getAllCategories({ page: 1, limit: 12 });
  const categories = categoriesResponse?.data?.categories;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body className={`max-w-[1920px] mx-auto flex flex-col font-inter bgcolor`}>
        <Toast richColors position="top-right" />
        <ConditionalLayout categories={categories}>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
