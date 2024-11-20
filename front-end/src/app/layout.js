import localFont from "next/font/local";

import StoreProvider from "@/store/StoreProvider";
import "./globals.css";
import Header from "@/_components/Header.jsx";

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

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <StoreProvider>
          <div className="flex flex-col items-center justify-center ">
              <Header />
              {children}
          </div>
      </StoreProvider>
      </body>
    </html>
  );
}
