import { ClerkProvider } from "@clerk/nextjs"
import { shadcn } from "@clerk/ui/themes"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "sonner"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Strand",
    template: "%s · Strand",
  },
  description: "Build and run collaborative browser automation workflows.",
  applicationName: "Strand",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <TooltipProvider>
        <body>
          <ClerkProvider
            appearance={{ theme: shadcn }}
            taskUrls={{
              "choose-organization": "/choose-organization",
            }}
          >
            <ThemeProvider>
              {children}
              <Toaster />
            </ThemeProvider>
          </ClerkProvider>
        </body>
      </TooltipProvider>
    </html>
  )
}
