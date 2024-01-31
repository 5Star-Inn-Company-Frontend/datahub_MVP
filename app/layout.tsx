
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import QueryProviders from "@/context/query-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Datahub MVP",
  description: "Datahub MVP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryProviders>
        <body className={inter.className}>
          {children}
          <Toaster />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            closeOnClick={false}
            rtl={false}
            draggable
            pauseOnFocusLoss
            theme="light"
          />
        </body>
      </QueryProviders>
    </html>
  );
}
