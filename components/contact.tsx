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
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 blob bg-primary/5 z-0"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 blob-small bg-secondary/5 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className={cn("transition-all duration-700", isVisible ? "opacity-100" : "opacity-0 translate-x-[-50px]")}
          >
            <h2 className="section-title text-left text-primary mb-8">Contact</h2>
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
            <Card className="bg-background/80 backdrop-blur-sm border-none shadow-lg glass-card">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <p className="text-lg md:text-xl mb-6">
                    "변화하는 기술을 빠르게 흡수하고,
                    <br />
                    <span className="highlight-text">현실적인 해결책으로 이어내는</span>
                    <br />
                    <strong className="text-primary">기획자, 김재원</strong>입니다."
                  </p>
                  <p className="text-muted-foreground">연락처: +82 10 7751 6123, twice6123@naver.com</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    className="flex items-center bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <a href="mailto:twice6123@naver.com" target="_blank" rel="noopener noreferrer">
                      <Mail className="mr-2 h-4 w-4" />
                      이메일 보내기
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex items-center border-primary/20 hover:bg-primary/5 hover:text-primary shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      이력서 다운로드
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex items-center border-primary/20 hover:bg-primary/5 hover:text-primary shadow-sm hover:shadow-md transition-all duration-300"
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
