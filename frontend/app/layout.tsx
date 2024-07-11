import type { Metadata } from "next";
import { getGlobalData, getGlobalPageMetadata } from "@/components/data/loaders";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

import { Header } from "@/components/custom/Header";
import { Footer } from "@/components/custom/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();

  return {
    title: metadata?.title,
    description: metadata?.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
//  console.dir(globalData, { depth: null });
  return (
    <html lang="en">
      <body className={inter.className}> 
        <Toaster position="bottom-center" />
        <Header data={globalData.header} />
        <div>{children}</div>
        <Footer data={globalData.footer} />
      </body>
    </html>
  );
}
