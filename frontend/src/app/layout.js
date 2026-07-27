import { DM_Sans, Raleway, Fira_Code } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata = {
  title: "Bookly - Personal Book Library",
  description: "ZenGrid powered book library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${raleway.variable} ${firaCode.variable}`}>
      <body>{children}</body>
    </html>
  );
}
