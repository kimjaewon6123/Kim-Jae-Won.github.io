"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, FileText, Instagram } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

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
      className="relative overflow-hidden bg-gradient-to-br from-[#f8fafc] via-primary/5 to-blue-50 dark:bg-gradient-to-b dark:from-[#23243a] dark:via-[#3a4a6a] dark:to-[#4a5a7a]"
    >
      {/* 섹션 fade 연결 */}
      <div className="absolute left-0 right-0 -top-2 h-12 bg-gradient-to-t from-transparent to-background dark:to-[#23243a] z-10 pointer-events-none" />
      {/* 포인트 블러/그라데이션 원 - 어긋나게 배치 */}
      <div className="absolute -top-24 -right-24 w-[320px] h-[260px] rounded-full bg-gradient-to-br from-[#e6f2fb] via-white to-[#b7cbe6] opacity-40 blur-2xl z-0" />
      <div className="absolute -bottom-20 -left-32 w-[220px] h-[180px] rounded-full bg-gradient-to-tr from-[#e6e6fa] via-[#b7cbe6] to-[#a3b8e6] opacity-20 blur-2xl z-0" />
      <div className="container mx-auto px-4 relative z-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center w-full max-w-full px-2 sm:px-4">
          <div
            className={cn("transition-all duration-700", isVisible ? "opacity-100" : "opacity-0 translate-x-[-50px]")}
          >
            <motion.h2
              className={cn(
                "section-title text-[#2e4a7d] text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight",
                isVisible ? "opacity-100" : "opacity-0 translate-y-10",
              )}
            >
              Contact
            </motion.h2>
            <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <img
                src="/my.png"
                alt="프로필 이미지"
                className="absolute inset-0 w-full h-full object-contain"
                style={{ pointerEvents: 'none' }}
              />
            </div>
          </div>

          <div
            className={cn(
              "transition-all duration-700 delay-300",
              isVisible ? "opacity-100" : "opacity-0 translate-x-[50px]",
            )}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-none shadow-none glass-card w-full max-w-full rounded-xl">
              <CardContent className="p-3 sm:p-6 dark:text-white">
                <div className="text-center mb-4 sm:mb-8">
                  <motion.p
                    className="text-sm sm:text-lg md:text-xl mb-2 sm:mb-6 text-[#4766a6] break-words"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                  >
                    "변화하는 기술을 빠르게 흡수하고,
                    <br />
                    <span className="highlight-text text-[#5a6e8c]">현실적인 해결책으로 이어내는</span>
                    <br />
                    <strong className="text-[#2e4a7d]">기획자, 김재원</strong>입니다."
                  </motion.p>
                  <p className="text-[#5a6e8c] text-xs sm:text-base break-words">연락처: +82 10 7751 6123, twice6123@naver.com</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center w-full">
                  <Button
                    asChild
                    className="flex items-center bg-gradient-to-r from-primary to-blue-400 hover:from-blue-500 hover:to-primary transition-all duration-300 w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4 group rounded-xl shadow-none"
                  >
                    <a href="mailto:twice6123@naver.com" target="_blank" rel="noopener noreferrer">
                      <motion.span whileHover={{ x: 4, scale: 1.13 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }} className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        이메일 보내기
                      </motion.span>
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex items-center border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-300 w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4 group rounded-xl shadow-none"
                  >
                    <a href="/docs/이력서.pdf" target="_blank" rel="noopener noreferrer">
                      <motion.span whileHover={{ x: 4, scale: 1.13 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }} className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        이력서 다운로드
                      </motion.span>
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex items-center border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-300 w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4 group rounded-xl shadow-none"
                  >
                    <a href="https://instagram.com/w0n.zip" target="_blank" rel="noopener noreferrer">
                      <motion.span whileHover={{ x: 4, scale: 1.13 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }} className="flex items-center">
                        <Instagram className="mr-2 h-4 w-4" />
                        @w0n.zip
                      </motion.span>
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
