import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

const gilroy = localFont({
  src: [
    {
      path: "../../public/font/Gilroy-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/Gilroy-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/Gilroy-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-gilroy antialiased",
          gilroy.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Toaster
          position="bottom-center"
          toastOptions={{
            className:
              "!bg-dark-400 !text-gray-100 !border !border-dark-500 !shadow-xl font-semibold",
            success: {
              className:
                "!bg-dark-400 !text-gray-100 !border !border-dark-500 !shadow-xl font-semibold",
              iconTheme: {
                primary: "#24AE7C",
                secondary: "#1a1d21",
              },
            },
            error: {
              className: "!bg-dark-400 !text-red-400 !border !border-red-900",
              iconTheme: {
                primary: "#f87171",
                secondary: "#1a1d21",
              },
            },
          }}
          
        />
      </body>
    </html>
  );
}
