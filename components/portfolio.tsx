"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, FileText, ArrowRight, TrendingUp, Zap, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const projects = [
  {
    id: "project1",
    title: "교육 플랫폼 UX 혁신",
    subtitle: "(천재교육 T셀파몰 리뉴얼)",
    period: "2024.01.14~2024.01.24",
    description:
      "현직 초등교사 10명 대상 시나리오 기반 UT(사용자 테스트)와 경쟁사 UX 분석 등 실사용 맥락에 기반한 리서치와 실무형 기획을 직접 수행. 실제 교사들의 니즈와 행동을 관찰하여 상품 탐색, 후기, 장바구니 등 주요 UX를 사용자 흐름 중심으로 재설계하고, 후기 기반 커뮤니티 기능을 신규 기획했습니다.",
    impact: "현직 교사 대상 UT/인터뷰 직접 설계 및 실행, Maze 테스트 후기→장바구니 이동 성공률 76% 달성, 데이터 기반 UX 개선 및 커뮤니티 활성화, 경쟁사 분석·시장분석·A/B 테스트 등 실전 기획 경험",
    process: "교사 10명 심층 인터뷰, 경쟁사 3종 UX 분석, 페르소나/여정지도, 시나리오 기반 UT, A/B 테스트, TAM/SAM/SOM 시장분석, 와이어프레임 작성",
    tech: "Figma, Google Forms, Notion, Zoom, Slack",
    tags: ["현업 프로젝트 경험", "교사 대상 UT", "유저 리서치", "커뮤니티 기능 기획", "데이터 기반 개선", "시장분석"],
    participation: "UX 리서치 및 기획 총괄",
    image: "/placeholder.svg?height=600&width=800",
    liveUrl: "/docs/t셀파몰.pdf",
    docsUrl: "#",
  },
  {
    id: "project2",
    title: "데이터 기반 광고 전략",
    subtitle: "(네이버 웹툰 쿠키오븐 리디자인)",
    period: "2024.09.16~2024.10.03",
    description:
      "117명 사용자 설문 데이터를 AHP 계층분석법으로 정량 분석하여, 사용자 선택 기준(보상 효율성, 콘텐츠 흥미도, 브랜드 인지도 등)에 기반한 UI 구조와 광고 노출 전략을 설계한 데이터 기반 UX 기획한 프로젝트입니다.",
    impact: "AHP 분석으로 광고 선택 기준의 중요도(보상 효율성 53.18% > 콘텐츠 흥미도 28.32% > 브랜드 인지도 18.49%) 도출, 목표 쿠키 기반 추천·광고 정렬/필터·실시간 신뢰도 안내 UI 등 사용자 중심 기능 설계, 무작위 노출 구조에서 맞춤형 추천 전략 중심 UI로 전환",
    process: "117명 사용자 설문 설계 및 수집, 광고 선택 요인 정의, AHP 계층분석 적용, 연령/성별별 분석 및 시각화, 기존 UI 분석, To-Be UI 설계 및 정책 제안, Figma 리디자인 시안 제작",
    tech: "Figma, Google Forms, Notion, Slack",
    tags: ["AHP 분석", "데이터 기반 기획", "UX 리서치", "UI/UX 리디자인", "광고 전략 설계"],
    participation: "UX 리서치 및 분석 기반 기획",
    image: "/p2.png",
    liveUrl: "/docs/네이버웹툰.pdf",
    docsUrl: "#",
  },
  {
    id: "project3",
    title: "애자일 팀 리더십",
    subtitle: "(POP-POP: 팝업스토어 실시간 정보 공유 커뮤니티 앱)",
    period: "2025.03.04 ~ 2025.06.28",
    description:
      "6인 팀의 PM으로 참여해 기획부터 설계, 협업, 개발, 배포까지 전 주기를 직접 경험한 실전 프로젝트. 2주 단위 스프린트 방식으로 팀을 운영하며, 예정된 기간 내 MVP를 성공적으로 출시했습니다.",
    impact: "6인 팀의 PM으로서 2주 단위 스프린트 운영, 전체 일정 기획 및 우선순위 정리, 세부 기능 30+개 설계 및 구현, 디자인 시스템 수립 및 와이어프레임 제작, 프론트/백엔드 연동 및 실제 앱 MVP 배포",
    process: "팀원 역할 정의, Notion 기반 스프린트 플래닝/회고, 기능 요구사항 정의 및 IA 설계, Figma 와이어프레임 및 프로토타입 제작, 프론트/백엔드 연동, 1차 테스트 및 피드백 반영",
    tech: "Figma, Google Drive, Notion, Jira",
    tags: ["PM 실전 경험", "애자일 협업", "MVP 출시", "기획-디자인-개발 소통", "사용자 여정 설계"],
    participation: "프로젝트 매니저(PM) & UX 기획 총괄",
    image: "/p3.png",
    liveUrl: "#",
    docsUrl: "#",
  },
  {
    id: "project4",
    title: "풀사이클 프로젝트",
    subtitle: "(미용실 실시간 예약 시스템 웹앱)",
    period: "2025.04.17 ~ 2025.04.30",
    description:
      "당일 예약 및 취소 좌석 공유 기능을 중심으로 한 실시간 예약 시스템. 기획부터 UX 설계, DB 구조화, 프로토타입 제작까지 혼자서 풀사이클로 수행한 개인 프로젝트.",
    impact: "기획부터 설계, 개발까지 전 과정 단독 주도, ERD 및 MySQL 기반 DB 구조 정의, Vibe Coding 기반 HTML/CSS 웹앱 프로토타입 구현 및 메인 페이지+로그인 흐름 완성",
    process: "문제 정의 및 사용자 페인포인트 분석, 요구사항 정의서/유즈케이스/흐름도/시퀀스 다이어그램 작성, ERD 및 DB 구조 설계, HTML/CSS 기반 UI/UX 프로토타입 제작",
    tech: "MySQL Workbench, Figma, HTML/CSS/JS, VS Code, Notion, Google Sheets/Docs",
    tags: ["풀사이클 기획", "DB 구조화", "UX 설계", "웹앱 프로토타입", "문제 중심 기획"],
    participation: "기획 · 설계 · 디자인 · 프론트 협업 총괄 (개인 프로젝트)",
    image: "/p4.png",
    liveUrl: "#",
    docsUrl: "#",
  },
  {
    id: "project5",
    title: "사용자 행동 데이터 분석",
    subtitle: "(이커머스 구매 여정 최적화)",
    description:
      "5,000명 이상의 사용자 행동 데이터를 분석하여 구매 전환율에 영향을 미치는 핵심 요소 발견. 데이터 기반 인사이트를 통해 UI 개선 방안 도출 및 적용 후 전환율 22% 향상.",
    impact: "구매 전환율 22% 향상, 장바구니 이탈률 17% 감소",
    process: "데이터 수집, 클러스터링 분석, 상관관계 분석, A/B 테스트",
    tech: "Python, Tableau, Google Analytics, Excel",
    tags: ["데이터 시각화", "Python 분석", "인사이트 도출", "A/B 테스트"],
    participation: "기획 100%, 데이터 분석",
    image: "/placeholder.svg?height=600&width=800",
    liveUrl: "#",
    docsUrl: "#",
  },
  {
    id: "project6",
    title: "AI 고객 서비스 혁신",
    subtitle: "(맞춤형 챗봇 개발)",
    description:
      "고객 문의 데이터 1,000건 이상을 분석하여 자주 묻는 질문 패턴을 파악하고, GPT 기반 챗봇 프롬프트 엔지니어링을 통해 응답 정확도 92%의 챗봇 개발. 고객 응대 시간 65% 단축.",
    impact: "고객 응대 시간 65% 단축, 사용자 만족도 4.7/5점",
    process: "문의 데이터 분석, 프롬프트 엔지니어링, 사용자 시나리오 설계, 테스트",
    tech: "GPT API, Python, Figma, Notion",
    tags: ["AI 활용", "프롬프트 엔지니어링", "사용자 시나리오", "자동화"],
    participation: "기획 100%, AI 프롬프트 설계",
    image: "/placeholder.svg?height=600&width=800",
    liveUrl: "#",
    docsUrl: "#",
  },
  {
    id: "project7",
    title: "신규 서비스 MVP 설계",
    subtitle: "(소셜 러닝 플랫폼)",
    description:
      "경쟁사 분석과 시장 조사를 통해 교육 시장의 블루오션을 발견하고, 소셜 러닝 기반의 새로운 서비스 컨셉 기획. 최소 기능으로 구성된 MVP를 설계하여 2개월 만에 베타 서비스 출시.",
    impact: "초기 사용자 300명 확보, 사용자 피드백 평균 4.5/5점",
    process: "시장 분석, 경쟁사 분석, 사용자 인터뷰, MVP 정의, 로드맵 설계",
    tech: "Figma, Miro, Notion, Excel",
    tags: ["시장 분석", "경쟁사 분석", "MVP 정의", "제품 로드맵"],
    participation: "기획 100%, 제품 전략",
    image: "/placeholder.svg?height=600&width=800",
    liveUrl: "#",
    docsUrl: "#",
  },
  {
    id: "project8",
    title: "종합 서비스 기획안",
    subtitle: "(핀테크 앱 리디자인)",
    description:
      "사용자 조사와 데이터 분석을 바탕으로 핀테크 앱의 종합 개선 기획안 작성. 경영진 프레젠테이션을 통해 프로젝트 예산 승인 획득. 명확한 문서화와 설득력 있는 제안으로 이해관계자 지지 확보.",
    impact: "프로젝트 예산 100% 승인, 경영진 만족도 4.8/5점",
    process: "사용자 조사, 데이터 분석, 기획안 작성, 프레젠테이션",
    tech: "PowerPoint, Excel, Figma, Notion",
    tags: ["문서화", "프레젠테이션", "이해관계자 설득", "예산 확보"],
    participation: "기획 100%, 프레젠테이션",
    image: "/placeholder.svg?height=600&width=800",
    liveUrl: "#",
    docsUrl: "#",
  },
]

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("project1")
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

    const section = document.getElementById("portfolio")
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  return (
    <section id="portfolio" className="section-padding bg-[#f8fafc] dark:bg-gradient-to-b dark:from-[#23243a] dark:via-[#3a4a6a] dark:to-[#4a5a7a] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className={cn(
            "section-title text-[#2e4a7d] transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          Portfolio
        </motion.h2>

        <div
          className={cn(
            "transition-all duration-700 delay-300",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          <Tabs defaultValue="project1" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex items-center justify-start bg-transparent w-full min-w-0 px-0 gap-1 max-sm:overflow-x-auto max-sm:scrollbar-hide max-sm:scroll-snap-x max-sm:mandatory max-sm:w-full max-sm:min-w-0 max-sm:gap-1 sm:flex-nowrap sm:overflow-x-visible sm:w-auto sm:gap-2" style={{ WebkitOverflowScrolling: 'touch' }}>
              {projects.map((project) => (
                <TabsTrigger
                  key={project.id}
                  value={project.id}
                  className="portfolio-tab mx-1 min-w-[120px] max-w-[200px] flex-shrink-0 scroll-snap-align-start text-xs sm:text-sm px-2 sm:px-3 py-1.5 whitespace-nowrap"
                >
                  {project.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {projects.map((project) => (
              <TabsContent key={project.id} value={project.id} className="mt-0 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center w-full max-w-full px-0 sm:px-2 mt-10 sm:mt-20">
                  <motion.div
                    whileHover={{ scale: 1.025, boxShadow: '0 8px 32px 0 rgba(80,120,200,0.13)' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="relative aspect-video overflow-hidden rounded-2xl shadow-xl bg-white flex items-center justify-center group transition-all duration-300"
                    style={{ minHeight: 180 }}
                  >
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
                    >
                      <Image
                        src={project.image && project.image !== "/placeholder.svg?height=600&width=800" ? project.image : "/p1.png"}
                        alt={project.title}
                        fill
                        className={project.id === 'project3' ? "object-contain group-hover:scale-105 transition-transform duration-500" : "object-cover group-hover:scale-105 transition-transform duration-500"}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                        style={project.id === 'project3'
                          ? {
                              minWidth: 0,
                              objectPosition: 'center top',
                              maxWidth: '95%',
                              maxHeight: '92%',
                              position: 'absolute',
                              top: '50%',
                              left: '49%',
                              transform: 'translate(-50%, -50%)',
                            }
                          : { minWidth: 0, objectPosition: 'center top' }}
                      />
                    </motion.div>
                    <div className="absolute bottom-0 left-0 w-full p-3 sm:p-6 flex flex-col gap-1 sm:gap-2 rounded-b-2xl" style={{background: 'linear-gradient(0deg, rgba(40,40,40,0.60) 70%, rgba(40,40,40,0.0) 100%)', zIndex: 2}}>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-0.5 sm:mb-1" style={{textShadow:'0 2px 8px rgba(0,0,0,0.7)'}}>{project.title}</h3>
                      <span className="text-[11px] sm:text-xs md:text-sm text-white/80 mb-1 sm:mb-2" style={{textShadow:'0 1px 4px rgba(0,0,0,0.5)'}}>{project.subtitle}</span>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-1 sm:mb-2">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[#2e4a7d] text-white shadow transition-colors duration-200 hover:bg-[#4766a6]" style={{textShadow:'0 1px 2px rgba(0,0,0,0.2)'}}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex flex-col justify-center gap-2 sm:gap-4 p-1 sm:p-6">
                    <div className="flex flex-row items-center justify-between w-full mb-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2e4a7d] mb-0.5 sm:mb-1">{project.title}</h3>
                      <div className="flex flex-col items-end text-xs sm:text-sm md:text-base text-muted-foreground">
                        {project.period && <span className="font-medium">{project.period}</span>}
                        {project.participation && <span className="">{project.participation}</span>}
                      </div>
                    </div>
                    <span className="text-sm sm:text-base md:text-lg text-muted-foreground mb-1 sm:mb-2">{project.subtitle}</span>
                    <p className="text-foreground text-xs sm:text-sm md:text-base mb-1 sm:mb-2">{project.description}</p>
                    <div className="mb-1 sm:mb-2">
                      <span className="font-semibold text-primary mr-1 sm:mr-2">주요 성과</span>
                      <span className="text-foreground text-[11px] sm:text-xs md:text-sm">{project.impact}</span>
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <span className="font-semibold text-primary mr-1 sm:mr-2">프로세스</span>
                      <span className="text-foreground text-[11px] sm:text-xs md:text-sm">{project.process}</span>
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <span className="font-semibold text-primary mr-1 sm:mr-2">활용 도구</span>
                      <span className="text-foreground text-[11px] sm:text-xs md:text-sm">{project.tech}</span>
                    </div>
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4 mt-1 sm:mt-2 self-end"
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        프로젝트 보기
                      </a>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
