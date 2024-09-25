import "@/app/globals.css";
import NavBar from "@/app/navBar";
import { Providers } from "@/app/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vee",
  description: "Cloud-based AI teammates to suit your needs",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <Providers className="flex justify-center">
          <div className="flex-grow flex flex-col max-w-screen-lg">
            {/* Vee product navigation bar */}
            <NavBar />

            {/* Main content to be displayed */}
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
