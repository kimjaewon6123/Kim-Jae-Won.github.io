"use client"

import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  // PRODUCT MANAGER 드롭 애니메이션 variants
  const dropContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.28,
      }
    }
  }
  const dropLetter = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 500, damping: 30, duration: 0.5 } }
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden max-w-[1920px] mx-auto">
      {/* 최상단 CREATIVE KIM JAEWON */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <span className="tracking-widest text-gray-700 text-sm xl:text-base font-light">CREATIVE KIM JAEWON</span>
      </div>
      {/* 우측 상단 세로 PORTFOLIO VOL.1 */}
      <motion.div
        className="absolute top-8 right-8 z-30 hidden xl:block"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.7 }}
      >
        <span
          className="tracking-widest text-gray-700 text-sm xl:text-base font-light"
          style={{ writingMode: 'vertical-rl' }}
        >
          PORTFOLIO<br />VOL.1
        </span>
      </motion.div>
      {/* 배경 */}
      <Image src="/back.png" alt="배경" fill priority className="object-cover z-0" />
      {/* 텍스트/버튼 - clamp/vw+max-w로 부드러운 비율 반응형 (PC/노트북) + 모바일 대응 */}
      <motion.div
        className="absolute top-40 left-[55%] -translate-x-[55%] z-20 w-full max-w-[440px] flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 mb-[40vh] md:left-[28%] md:translate-x-0 md:items-start md:text-left md:top-[400px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h1
          className="text-white font-bold mb-4 xl:mb-2 text-center md:text-left px-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl break-normal leading-tight max-w-[950px]"
          style={{ fontFamily: "'Noto Sans KR', Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif" }}
          variants={dropContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center sm:block">
            <div className="w-full sm:inline-block">
              {"PRODUCT".split("").map((char, i) => (
                <motion.span key={i} variants={dropLetter} style={{ display: "inline-block" }}>{char}</motion.span>
              ))}
            </div>
            <div className="w-full sm:inline-block">
              {"MANAGER".split("").map((char, i) => (
                <motion.span key={i} variants={dropLetter} style={{ display: "inline-block" }}>{char}</motion.span>
              ))}
            </div>
          </div>
        </motion.h1>
      </motion.div>
      {/* 인물 이미지 - clamp/vw+max-w로 부드러운 비율 반응형 (PC/노트북) + 모바일 대응 */}
      <motion.div
        className="absolute bottom-0 left-[28%] -translate-x-[28%] md:left-1/2 md:-translate-x-1/2 z-10 aspect-[3/5] pointer-events-none select-none translate-y-3"
        style={{ width: "clamp(260px, 24vw, 600px)", maxWidth: "90vw" }}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
          scale: { duration: 1.5, ease: [0.4, 0, 0.2, 1] },
          delay: 0.1
        }}
        viewport={{ once: true, amount: 0.5 }}
        whileHover={{ scale: 1.03 }}
      >
        <Image
          src="/my.png"
          alt="인물"
          fill
          priority
          className="object-contain drop-shadow-2xl"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 24vw, 600px"
          style={{ objectPosition: '25% center' }}
        />
      </motion.div>
      {/* 하단 스크롤 인디케이터 */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center scroll-indicator pointer-events-none select-none">
        <span className="text-sm text-muted-foreground mb-1">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  )
} 