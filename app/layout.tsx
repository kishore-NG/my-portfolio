import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Kishore | Full Stack Developer",
  description: "Portfolio of Kishore",
  openGraph: {
    title: "Kishore Portfolio",
    description: "Flutter & Full Stack Developer",
    url: "https://your-site.vercel.app",
    siteName: "Kishore Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Navbar />
        {children}
      </body>
    </html>
  );
}