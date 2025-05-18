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
    description:
      "교사 사용자 리서치를 통해 발견한 핵심 페인포인트 3가지를 해결하여 구매 전환율 27% 향상 및 사용자 만족도 개선. 현업 담당자와의 협업을 통해 실제 서비스에 적용된 개선안 기획.",
    impact: "구매 전환율 27% 향상, 사용자 만족도 4.2→4.7점 상승",
    process: "심층 인터뷰 10명, 설문조사 87명, 경쟁사 분석, 퍼소나 설계, 사용자 여정 지도 작성",
    tech: "Figma, Miro, Notion, Excel",
    tags: ["As is-To be 분석", "교사 대상 리서치", "현업 프로젝트 경험", "UI/UX 개선"],
    participation: "기획 100%",
    image: "/placeholder.svg?height=600&width=800",
    liveUrl: "/docs/t셀파몰.pdf",
    docsUrl: "#",
  },
  {
    id: "project2",
    title: "데이터 기반 광고 전략",
    subtitle: "(네이버 웹툰 쿠키오븐)",
    description:
      "117명의 웹툰 사용자 설문과 AHP 분석을 통해 광고 선택 요인을 정량적으로 분석하고, 사용자 경험을 해치지 않는 새로운 광고 UI 설계. 기존 대비 광고 클릭률 32% 향상 방안 제시.",
    impact: "광고 클릭률 32% 향상 예측, 사용자 이탈률 18% 감소 예상",
    process: "117명 사용자 설문, AHP 분석, 히트맵 분석, A/B 테스트 설계",
    tech: "SPSS, Excel, Figma, Google Analytics",
    tags: ["117명 유저 설문", "AHP 분석 기획", "UX기반 광고 전략", "데이터 시각화"],
    participation: "기획 100%",
    image: "/p2.png",
    liveUrl: "/docs/네이버웹툰.pdf",
    docsUrl: "#",
  },
  {
    id: "project3",
    title: "애자일 팀 리더십",
    subtitle: "(팝업스토어 커뮤니티 앱)",
    description:
      "6인 팀의 PM으로서 2주 단위 스프린트 방식으로 실시간 팝업스토어 정보 공유 앱을 성공적으로 기획. 팀원 간 효율적인 협업 시스템 구축으로 일정 내 MVP 출시 달성.",
    impact: "기획 단계 일정 준수율 100%, 팀 만족도 조사 4.8/5점",
    process: "애자일 스프린트, 데일리 스크럼, 백로그 관리, 회고 미팅 진행",
    tech: "Jira, Slack, Figma, Miro",
    tags: ["6인 협업 리딩", "커뮤니케이션", "애자일 스프린트", "백로그 관리"],
    participation: "기획 100%, 팀 리드",
    image: "/p3.png",
    liveUrl: "#",
    docsUrl: "#",
  },
  {
    id: "project4",
    title: "풀 사이클 프로젝트",
    subtitle: "(미용실 예약 시스템)",
    description:
      "기획부터 개발 협업까지 전 과정을 경험한 풀 사이클 프로젝트. ERD 설계 및 DB 구조화 작업에 직접 참여하여 개발자와의 원활한 협업 진행. VIBE CODING을 통한 프로토타입 제작.",
    impact: "예약 프로세스 단축 (5단계→3단계), 사용자 이탈률 25% 감소",
    process: "요구사항 분석, ERD 설계, 와이어프레임 제작, 개발자 협업",
    tech: "Figma, MySQL, GitHub, VS Code",
    tags: ["개발 이해도", "VIBE CODING", "ERD 및 DB설계", "풀스택 협업"],
    participation: "기획 100%, 개발 협업",
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
    <section id="portfolio" className="section-padding bg-background relative overflow-hidden">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start w-full max-w-full px-0 sm:px-2 mt-10 sm:mt-20">
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
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2e4a7d] mb-0.5 sm:mb-1">{project.title}</h3>
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
