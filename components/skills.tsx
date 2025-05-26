"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  ClipboardCheck,
  Target,
  Brain,
  UsersRound,
  GitBranch,
  Workflow,
  Figma,
  FileSpreadsheet,
  FileCode2,
  Trello,
  MessageSquare,
} from "lucide-react"

const skills = [
  {
    icon: ClipboardCheck,
    slogan: '실무 중심의 기획, 디테일에서 경쟁력이 나온다',
    description: '서비스 개선, IA 설계, 와이어프레임 및 프로토타입 작성 등 기획 전반의 실무형 문서화 역량 보유',
  },
  {
    icon: Target,
    slogan: '사용자 중심 전략을 구조화하다',
    description: '페르소나 설계, 여정 지도, 블루프린트 기반의 전략적 기획과 데이터 기반 의사결정 경험 보유',
  },
  {
    icon: Brain,
    slogan: 'AI와 함께 기획을 더 빠르고 똑똑하게',
    description: 'Prompt Engineering, Vibe Coding, ChatGPT 등 생성형 AI를 활용한 기획 자동화 및 혁신 경험',
  },
  {
    icon: UsersRound,
    slogan: '다양한 팀과 함께 목표를 실현하는 커뮤니케이터',
    description: '팀 커뮤니케이션, 요구사항 분석, 이해관계자 협업을 통해 효과적인 실행력을 이끈 경험',
  },
]

const toolImages = [
  { src: "/1.png", alt: "tool1" },
  { src: "/2.png", alt: "tool2" },
  { src: "/3.png", alt: "tool3" },
  { src: "/4.png", alt: "tool4" },
  { src: "/5.png", alt: "tool5" },
  { src: "/6.png", alt: "tool6" },
  { src: "/7.png", alt: "tool7" },
  { src: "/8.png", alt: "tool8" },
  { src: "/9.png", alt: "tool9" },
  { src: "/10.png", alt: "tool10" },
  { src: "/11.png", alt: "tool11" },
  { src: "/12.png", alt: "tool12" },
  { src: "/13.png", alt: "tool13" },
]

export default function Skills() {
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

    const section = document.getElementById("skills")
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden scroll-mt-24 md:scroll-mt-32 bg-background dark:bg-gradient-to-b dark:from-[#23243a] dark:via-[#3a4a6a] dark:to-[#4a5a7a]"
    >
      {/* 섹션 fade 연결 */}
      <div className="absolute left-0 right-0 -top-2 h-12 bg-gradient-to-t from-transparent to-background dark:to-[#23243a] z-10 pointer-events-none" />
      {/* 포인트 블러/그라데이션 원 - 어긋나게 배치 */}
      <div className="absolute -top-20 -left-40 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-[#e6e6fa] to-[#b7cbe6] opacity-40 blur-2xl z-0" />
      <div className="absolute -bottom-24 -right-24 w-[260px] h-[260px] rounded-full bg-gradient-to-tr from-[#b7cbe6] to-[#e6f2fb] opacity-30 blur-2xl z-0" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2
          className={cn(
            "section-title text-[#9AB2D8] transition-all duration-700 text-3xl sm:text-4xl md:text-5xl font-extrabold text-center",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          My Capabilities
        </h2>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-24 transition-all duration-700 delay-300",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item flex flex-col items-start text-left p-6 rounded-xl transition-transform duration-300 hover:scale-105"
            >
              <skill.icon className="w-16 h-16 mb-4 text-[#9AB2D8] dark:text-[#b7cbe6]" />
              <h3 className="text-lg font-semibold mb-1 text-foreground leading-tight">{skill.slogan}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">{skill.description}</p>
            </div>
          ))}
        </div>

        <h2
          className={cn(
            "section-title text-[#9AB2D8] dark:text-white transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          Tools I Use
        </h2>

        {/* 기존 툴 이미지 영역을 가로 스크롤 가능한 영역으로 변경 */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="flex animate-scroll space-x-8">
            {toolImages.map((tool, index) => (
              <img
                key={index}
                src={tool.src}
                alt={tool.alt}
                className="w-16 h-16 flex-shrink-0 object-contain"
              />
            ))}
            {/* 무한 스크롤을 위한 복제 이미지 */}
            {toolImages.map((tool, index) => (
              <img
                key={`duplicate-${index}`}
                src={tool.src}
                alt={tool.alt}
                className="w-16 h-16 flex-shrink-0 object-contain"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

/* 스크롤바 숨김 (선택 사항) */
