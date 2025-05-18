"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const profileData = [
  {
    content: `
      이름 : 김재원 (KIM JAE WON)
      생년월일 : 2000.07.20
      연락처 : +82 10 7751 6123
      이메일 : twice6123@naver.com
      SNS : @w0n.zip
      학력 : 한국공학대학교 IT경영학과 (7월 졸업예정)
      복수전공 : e-커머스학과
    `,
  },
  {
    content: `
      자격증 :
      • Google Analytics (2025.05)
      • 1종보통운전면허 (2019.12)
      • 정보기술자격(ITQ) 아래한글 A등급 (2013.03)
      • 정보기술자격(ITQ) 한글파워포인트(한쇼) B등급 (2012.12)
      
      교육 :
      • 천재교육 에듀테크 PM 서비스/콘텐츠 기획자 10기 (2024.12 - 2025.07)
      • 패스트캠퍼스 EXPORT PM/PO 4기 (2024.09 - 2024.12)
    `,
  },
]

const tags = [
  "#기획자",
  "#PM",
  "#PO",
  "#서비스기획",
  "#UX설계",
  "#와이어프레임",
  "#프로토타입",
  "#애자일",
  "#AI활용기획",
]

// 태그별 랜덤 파스텔 컬러 (고정)
const tagColors = [
  "bg-gradient-to-r from-[#a8edea] to-[#fed6e3]",
  "bg-gradient-to-r from-[#fcb69f] to-[#ffecd2]",
  "bg-gradient-to-r from-[#f6d365] to-[#fda085]",
  "bg-gradient-to-r from-[#cfd9df] to-[#e2ebf0]",
  "bg-gradient-to-r from-[#e0c3fc] to-[#8ec5fc]",
  "bg-gradient-to-r from-[#f093fb] to-[#f5576c]",
  "bg-gradient-to-r from-[#43e97b] to-[#38f9d7]",
  "bg-gradient-to-r from-[#30cfd0] to-[#330867]",
  "bg-gradient-to-r from-[#5ee7df] to-[#b490ca]",
]

export default function AboutMe() {
  const [activeProfile, setActiveProfile] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)

  const nextProfile = () => {
    setActiveProfile((prev) => (prev === profileData.length - 1 ? 0 : prev + 1))
  }

  const prevProfile = () => {
    setActiveProfile((prev) => (prev === 0 ? profileData.length - 1 : prev - 1))
  }

  return (
    <section id="about" className="w-full flex flex-col items-center justify-center bg-background py-12 md:py-20 md:min-h-screen scroll-mt-24 md:scroll-mt-32 relative overflow-hidden">
      {/* 배경 장식용 블루 그라데이션 원 */}
      <div className="hidden md:block absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#e6f2fb] to-[#b7cbe6] opacity-60 blur-2xl z-0" />
      <div className="hidden md:block absolute -bottom-32 -left-32 w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-[#e6f2fb] to-[#b7cbe6] opacity-50 blur-2xl z-0" />
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center z-10">
        {/* 왼쪽: 프로필 (애니메이션) */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center flex-shrink-0 w-full max-w-[90vw] sm:max-w-xs md:max-w-[380px] bg-gradient-to-b from-[#e6f2fb] to-[#c7d8ee] rounded-2xl p-2 sm:p-4 md:p-10 shadow-xl transition-all duration-300 mx-auto md:sticky"
          style={{ boxShadow: '0 2px 24px 0 rgba(120,120,200,0.13)', top: '120px', zIndex: 20 }}
        >
          <h2 className="text-2xl md:text-[2.5rem] font-bold text-foreground text-center mb-4 md:mb-6 mt-0 leading-none select-none">About me</h2>
          <div className="relative w-full max-w-[220px] md:max-w-[260px] aspect-[4/5] mb-3 md:mb-4 overflow-visible rounded-xl transition-all duration-300 group hover:shadow-xl mx-auto" style={{ background: '#fff' }}>
            <motion.img
              src="/my2.png"
              alt="Profile"
              className="object-cover"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: 0,
                bottom: 0,
                transform: 'none',
                display: 'block',
                objectPosition: 'bottom center',
                zIndex: 10,
              }}
              whileHover={{ scale: 1.09, zIndex: 30 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            />
            {/* 우측 세로 텍스트 */}
            <span className="absolute right-2 top-4 text-foreground text-base md:text-lg tracking-widest select-none" style={{ writingMode: 'vertical-rl', letterSpacing: '0.1em' }}>
              2000.07.20
            </span>
          </div>
          {/* 하단 CLICK HERE! */}
          <motion.span
            className="mt-3 md:mt-4 text-lg md:text-[1.3rem] font-bold text-foreground tracking-wider cursor-pointer select-none transition-all duration-200"
            animate={{ scale: [1, 1.13, 1, 0.95, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{
              scale: 1.18,
              color: "#d45c5c",
              textShadow: "0 0 16px #97B1D6, 0 2px 8px #b7cbe6"
            }}
            whileTap={{ scale: 0.93 }}
          >
            CLICK HERE!
          </motion.span>
        </motion.div>
        {/* 오른쪽: 정보 카드 (glassmorphism + 애니메이션) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true, amount: 0.4 }}
          className="flex-1 flex flex-col items-start justify-center rounded-2xl shadow-lg p-4 md:p-12 backdrop-blur-md bg-white/70 border border-transparent min-w-0" style={{ minHeight: 320 }}
        >
          <h2 className="text-2xl md:text-[3rem] font-bold text-foreground text-left mb-2 mt-0 leading-none">About me</h2>
          <div className="w-12 md:w-16 h-1 bg-[#97B1D6] rounded-full mb-4 md:mb-6" />
          {/* 슬라이드 전환 버튼 */}
          <div className="flex justify-end gap-2 mb-2 md:mb-4 w-full">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActiveSlide(0)}
              className={`h-8 w-8 border-primary/30 hover:bg-primary hover:text-white rounded-full transition-colors duration-200 ${activeSlide === 0 ? 'bg-primary text-white' : ''}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActiveSlide(1)}
              className={`h-8 w-8 border-primary/30 hover:bg-primary hover:text-white rounded-full transition-colors duration-200 ${activeSlide === 1 ? 'bg-primary text-white' : ''}`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          {activeSlide === 0 ? (
            <>
              {/* 프로필 정보 */}
              <div className="min-h-[120px] md:min-h-[250px] whitespace-pre-line leading-relaxed text-foreground text-base md:text-[1.15rem] text-[#222] mb-6 md:mb-8 break-words">
                {profileData[activeProfile].content}
              </div>
              {/* 태그: Badge만, hover시 색상만 변경 */}
              <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="tag text-base md:text-lg px-3 md:px-4 py-1.5 md:py-2 rounded-full border-primary/30 text-primary font-semibold bg-white transition-all duration-200 hover:bg-primary hover:text-white cursor-pointer"
                    style={{ borderWidth: 2 }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full">
              {/* 경력/활동 타임라인 복구 */}
              <div className="flex flex-col gap-6 md:gap-8 mt-2 md:mt-4">
                <div>
                  <div className="font-bold text-lg md:text-xl text-foreground mb-1">주요 경력</div>
                  <ul className="list-disc pl-5 text-base md:text-lg text-[#222]">
                    <li>천재교육 에듀테크 PM 서비스/콘텐츠 기획자 10기 <span className="text-muted-foreground">(2024.12 - 2025.07)</span></li>
                    <li>IT'S TIME PM  <span className="text-muted-foreground">(2025.02 - 2025.07)</span></li>
                    <li>NUFI 동아리 기획부장 <span className="text-muted-foreground">(2024.03 - 2025.02)</span></li>
                    <li>패스트캠퍼스 EXPORT PM/PO 4기 <span className="text-muted-foreground">(2024.09 - 2024.12)</span></li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-lg md:text-xl text-foreground mb-1">자격증</div>
                  <ul className="list-disc pl-5 text-base md:text-lg text-[#222]">
                    <li>Google Analytics <span className="text-muted-foreground">(2025.05)</span></li>
                    <li>1종보통 운전면허 <span className="text-muted-foreground">(2019.12)</span></li>
                    <li>정보기술자격(ITQ) 아래한글 A등급 <span className="text-muted-foreground">(2013.03)</span></li>
                    <li>정보기술자격(ITQ) 한글파워포인트(한쇼) B등급 <span className="text-muted-foreground">(2012.12)</span></li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-lg md:text-xl text-foreground mb-1">교육</div>
                  <ul className="list-disc pl-5 text-base md:text-lg text-[#222]">
                    <li>천재교육 에듀테크 PM 서비스/콘텐츠 기획자 10기 <span className="text-muted-foreground">(2024.12 - 2025.07)</span></li>
                    <li>패스트캠퍼스 EXPORT PM/PO 4기 <span className="text-muted-foreground">(2024.09 - 2024.12)</span></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
