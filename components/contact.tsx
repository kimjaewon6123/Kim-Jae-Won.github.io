"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, FileText, Instagram } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("contact")
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-b from-background to-primary/5 relative overflow-hidden"
    >
      {/* 자연스러운 블러/그라데이션 원 배경 (통일감+변형) */}
      <div className="absolute -top-40 -right-24 w-[420px] h-[380px] rounded-full bg-gradient-to-br from-[#e6f2fb] via-white to-[#b7cbe6] opacity-70 blur-[90px] z-0" />
      <div className="absolute -bottom-28 -left-40 w-[340px] h-[300px] rounded-full bg-gradient-to-tr from-[#e6e6fa] via-[#b7cbe6] to-[#a3b8e6] opacity-40 blur-[70px] z-0" />
      {/* subtle noise overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'url(/noise.png)', opacity: 0.08}} />
      {/* linear-gradient overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'linear-gradient(120deg,rgba(255,255,255,0.2)_0%,rgba(183,203,230,0.08)_100%)'}} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center w-full max-w-full px-2 sm:px-4">
          <div
            className={cn("transition-all duration-700", isVisible ? "opacity-100" : "opacity-0 translate-x-[-50px]")}
          >
            <h2 className="section-title text-left mb-8 text-[#2e4a7d]">Contact</h2>
            <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden shadow-lg gradient-border">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="relative w-3/4 h-3/4 bg-white/10 backdrop-blur-sm rounded-lg shadow-inner animate-float"></div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "transition-all duration-700 delay-300",
              isVisible ? "opacity-100" : "opacity-0 translate-x-[50px]",
            )}
          >
            <Card className="bg-background/80 backdrop-blur-sm border-none shadow-lg glass-card w-full max-w-full">
              <CardContent className="p-3 sm:p-6">
                <div className="text-center mb-4 sm:mb-8">
                  <p className="text-sm sm:text-lg md:text-xl mb-2 sm:mb-6 text-[#4766a6] break-words">
                    "변화하는 기술을 빠르게 흡수하고,
                    <br />
                    <span className="highlight-text text-[#5a6e8c]">현실적인 해결책으로 이어내는</span>
                    <br />
                    <strong className="text-[#2e4a7d]">기획자, 김재원</strong>입니다."
                  </p>
                  <p className="text-[#5a6e8c] text-xs sm:text-base break-words">연락처: +82 10 7751 6123, twice6123@naver.com</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center w-full">
                  <Button
                    asChild
                    className="flex items-center bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4"
                  >
                    <a href="mailto:twice6123@naver.com" target="_blank" rel="noopener noreferrer">
                      <Mail className="mr-2 h-4 w-4" />
                      이메일 보내기
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex items-center border-primary/20 hover:bg-primary/5 hover:text-primary shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4"
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      이력서 다운로드
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex items-center border-primary/20 hover:bg-primary/5 hover:text-primary shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4"
                  >
                    <a href="https://instagram.com/w0n.zip" target="_blank" rel="noopener noreferrer">
                      <Instagram className="mr-2 h-4 w-4" />
                      @w0n.zip
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
