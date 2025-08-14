import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import SidemenuComponents from "@/components/Sidemenu-componenets"
import { ThemeProvider } from "next-themes"
import { DesktopHeader } from "@/components/DesktopHeader"


// Optimized font loading - removed unused fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Better performance
  preload: true,
})

export const metadata: Metadata = {
  title: "Email Dashboard",
  description: "A modern email dashboard built with Next.js",
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className="antialiased font-inter">
           <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-screen overflow-hidden">
            {/* Sidebar - Always visible on desktop, hidden on mobile */}
            <aside className="hidden lg:block flex-shrink-0">
              <SidemenuComponents />
            </aside>
            
            {/* Main content area */}
            <main className="flex-1">
              <DesktopHeader />
              <div className="h-full overflow-y-auto">
                {children}
              </div>
            </main>
          </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
