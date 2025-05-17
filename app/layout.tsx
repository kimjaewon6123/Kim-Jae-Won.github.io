import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_KR } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CustomCursor from "@/components/CustomCursor"

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

export const metadata: Metadata = {
  title: "김재원 포트폴리오 | 기획자",
  description: "변화하는 기술을 빠르게 흡수하고, 현실적인 해결책으로 이어내는 기획자 김재원입니다.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={notoSansKR.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
