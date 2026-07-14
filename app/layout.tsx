import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs"
import { shadcn } from "@clerk/ui/themes"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

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
      <body>
        <ClerkProvider appearance={{ theme: shadcn }}>
          <ThemeProvider>
            <header className="border-b bg-background/95 backdrop-blur">
              <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
                <div className="text-sm font-medium">Browser Auto</div>
                <div className="flex items-center gap-2">
                  <Show when="signed-out">
                    <SignInButton>
                      <button className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground">
                        Sign in
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90">
                        Sign up
                      </button>
                    </SignUpButton>
                  </Show>
                  <Show when="signed-in">
                    <UserButton />
                  </Show>
                </div>
              </div>
            </header>
            {children}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
