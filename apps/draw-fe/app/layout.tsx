import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google"; // 1. Import Inter and Caveat
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

// 2. Configure the fonts and assign them to CSS variables
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "700"],
  display: 'swap',
});

export const metadata = {
  title: "SketchBoard - Your Visual Thinking Canvas",
  description: "A free, open-source digital whiteboard for sketching hand-drawn diagrams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 3. Apply the font variables to the body tag */}
      <body className={`${inter.variable} ${caveat.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Let's default to dark mode as it's our primary theme
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}