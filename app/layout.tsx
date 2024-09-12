import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const roboto = Roboto({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Expense tracker",
    description: "Track your expenses andd create a budget",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={roboto.className}>
                    <Header />
                        <main className="container">
                            {children}
                        </main>
                        <ToastContainer />
                </body>
            </html>
        </ClerkProvider>
    );
}
