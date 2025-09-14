// app/(routes)/solutions/page.tsx

import { Inter } from 'next/font/google';
import { Header } from "@/app/components/common/header";
import Footer from "@/app/components/common/footer";
import BasicBodyProvider from "@/app/components/providers/basic-body-provider";
import BasicPageProvider from "@/app/components/providers/basic-page-provider";

const inter = Inter({ subsets: ['latin'] });

export default function SolutionsPage() {
  return (
    <BasicPageProvider fontClassName={inter.className}>
      <BasicBodyProvider header={<Header variant="landing" />} footer={<Footer />}>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold">Solutions</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This page is under construction. Please check back later!
          </p>
        </div>
      </BasicBodyProvider>
    </BasicPageProvider>
  );
}