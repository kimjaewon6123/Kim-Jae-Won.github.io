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
    <section
      id="home"
      className="w-full h-screen relative z-10 overflow-x-hidden max-w-full"
      style={{ background: "#f8fafc" }}
    >
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
      <Image 
        src="/back.png" 
        alt="배경" 
        fill 
        priority 
        className="object-cover z-0" 
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      {/* 모바일: 브릿지 멘트 - 나비 위치, 왼쪽 정렬 */}
      {/* 이 부분 전체 삭제 */}
      {/* 인물 이미지 - 하단 정렬 (배경 하단과 맞춤) */}
      {/* 스크롤 유도 더블 화살표 */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-16 z-30 flex flex-col items-center"
        style={{ pointerEvents: 'none' }}
      >
        <motion.svg
          width="56" height="56" viewBox="0 0 56 56" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ y: 0, opacity: 0.7 }}
          animate={{ y: [0, 18, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'block' }}
        >
          <polyline points="16,22 28,34 40,22" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <polyline points="16,10 28,22 40,10" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </motion.svg>
        <span className="mt-2 text-white text-base sm:text-lg font-semibold drop-shadow-lg select-none" style={{letterSpacing:'0.04em'}}>SCROLL</span>
      </div>
      {/* 텍스트/버튼 - 왼쪽 정렬, 크게, 반응형 */}
      <motion.div
        className="absolute top-[18%] sm:top-[32%] left-0 z-20 w-full max-w-none flex flex-col items-start justify-center px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.h1
          className="text-white font-bold mb-4 xl:mb-2 text-left text-[2.1rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl leading-[1.05] max-w-[1100px] drop-shadow-lg"
          variants={dropContainer}
          initial="hidden"
          animate="visible"
        >
          {/* 브릿지 멘트 - 항상 PRODUCT MANAGER 위에 */}
          <span
            className="block mb-2 sm:mb-4 text-[#2e4a7d] text-base sm:text-xl md:text-2xl font-bold leading-snug drop-shadow-lg"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.22), 0 1px 2px rgba(0,0,0,0.18)',
              wordBreak: 'keep-all',
            }}
          >
            <span className="text-white/95">AI기술과 사람을 잇는,</span><br/>브릿지
          </span>
          <div className="flex flex-col items-start">
            <div>
              {"PRODUCT".split("").map((char, i) => (
                <motion.span key={i} variants={dropLetter} style={{ display: "inline-block" }}>{char}</motion.span>
              ))}
            </div>
            <div>
              {"MANAGER".split("").map((char, i) => (
                <motion.span key={i} variants={dropLetter} style={{ display: "inline-block" }}>{char}</motion.span>
              ))}
            </div>
          </div>
        </motion.h1>
      </motion.div>
      {/* 인물 이미지 - 모바일은 중앙, 크게, 텍스트 아래 / sm 이상은 기존 위치 */}
      <div className="block sm:hidden w-full mt-8 flex justify-center">
        <div className="w-[90px] max-w-[28vw] min-w-0 aspect-[3/5] pointer-events-none select-none mb-4 custom-mobile-img-size">
          <Image
            src="/my.png"
            alt="인물"
            fill
            priority
            className="object-contain drop-shadow-2xl"
            sizes="32vw"
            style={{ objectPosition: 'bottom center' }}
          />
        </div>
      </div>
      <motion.div
        className="hidden sm:block absolute bottom-0 left-[28%] -translate-x-[28%] md:left-1/2 md:-translate-x-1/2 z-10 aspect-[3/5] pointer-events-none select-none"
        style={{ width: "clamp(280px, 28vw, 800px)", maxWidth: "48vw" }}
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
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, (max-width: 1536px) 34vw, 800px"
          style={{ objectPosition: 'bottom center' }}
        />
      </motion.div>
    </section>
  )
} 