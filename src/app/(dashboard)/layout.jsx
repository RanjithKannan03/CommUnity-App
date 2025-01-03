import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import SideNav from "@/components/SideNav";
import SessionHandler from "@/components/SessionHandler";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionHandler>
          <Providers>
            <div className="w-screen h-screen">
              <div className="w-full h-20">
                <Navbar />
              </div>
              <div className="h-[calc(100vh-5rem)] bg-[#FFFFFF] dark:bg-[#141414] w-full flex">
                {/* Side nav */}
                <SideNav />
                <div className="flex-1 px-4 overflow-auto md:px-8">
                  {children}
                </div>
              </div>
            </div>
          </Providers>
        </SessionHandler>
      </body>
    </html>
  );
}
