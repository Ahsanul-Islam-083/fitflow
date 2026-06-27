import { ThemeProvider } from "@/components/theme-provider";
import { Kanit, Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const kanit = Kanit({
  variable: "--font-kanit",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FitFlow - Smart Fitness & Gym Management Platform",
  description: "FitFlow is an all-in-one fitness and gym management platform that helps gyms manage memberships, trainers, classes, attendance, payments, and member progress with ease.",
};

import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ubuntu.variable} ${kanit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#2563eb" showSpinner={false} height={3} shadow="0 0 10px #2563eb,0 0 5px #2563eb" />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
