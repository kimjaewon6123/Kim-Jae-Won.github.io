"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, FileText, ArrowRight, TrendingUp, Zap, Award, Search, ArrowUpRight, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import PDFModal from "./PDFModal"

const projects = [
  // 1. 교육 플랫폼 UX 혁신
  {
    id: "project1",
    title: "교육 플랫폼 UX 혁신",
    subtitle: "(천재교육 T셀파몰 리뉴얼)",
    period: "2025.01.14~2025.01.24",
    description:
      "현직 초등교사 10명 대상 시나리오 기반 UT(사용자 테스트)와 경쟁사 분석, UX 분석 등 실사용 맥락에 기반한 리서치와 실무형 기획을 직접 수행했습니다. 실제 교사들의 니즈와 행동을 관찰하여 상품 탐색, 후기, 장바구니 등 주요 UX를 사용자 흐름 중심으로 재설계하고, 후기 기반 커뮤니티 기능을 신규 기획했습니다.",
    impact: "현직 교사 대상 UT/인터뷰 직접 설계 및 실행, A/B 테스트 결과 67% 달성, 데이터 기반 UX 개선 및 커뮤니티 활성화, 경쟁사 분석·시장분석·A/B 테스트 등 실전 기획 경험",
    process: "교사 10명 심층 인터뷰, 경쟁사 분석, 페르소나/여정지도, 시나리오 기반 UT, A/B 테스트, TAM/SAM/SOM 시장분석, 와이어프레임 작성",
    tech: "Figma, Google Forms, Notion, Zoom, Slack",
    tags: ["현업 프로젝트 경험", "교사 대상 UT", "유저 리서치", "A/B 테스트", "데이터 기반 개선", "시장분석"],
    participation: "UX 리서치 및 기획 총괄",
    image: "/p1.png",
    liveUrl: "/docs/t셀파몰.pdf",
    docsUrl: "#",
  },
  // 2. 애자일 팀 리더십
  {
    id: "project3",
    title: "애자일 팀 리더십",
    subtitle: "(POP-POP: 팝업스토어 실시간 정보 공유 커뮤니티 앱)",
    period: "2025.02.14~2025.06.10",
    description:
      "팝업스토어 정보 공유 커뮤니티 앱 기획 및 개발 프로젝트입니다. 사용자 리서치를 통해 팝업스토어 정보의 실시간성과 커뮤니티 기능의 필요성을 도출하고, 이를 바탕으로 1명의 디자이너, 4명의 개발자와 함께 MVP를 개발했습니다.",
    impact: "사용자 리서치 기반 핵심 기능 도출, 애자일 방식의 MVP 개발 및 출시, 사용자 피드백 기반 지속적 개선, 팀 협업 프로세스 구축",
    process: "사용자 리서치, 페르소나/여정지도 설계, 기능 정의, 와이어프레임 작성, MVP 개발 및 출시, 사용자 피드백 수집 및 개선",
    tech: "Figma, Notion, Slack, Jira, GitHub",
    tags: ["PM 실전 경험", "애자일 협업", "MVP 출시", "기획-디자인-개발 소통", "팀 협업 프로세스 구축"],
    participation: "PM 및 기획 총괄",
    image: "/p3.png",
    liveUrl: "/docs/POP.pdf",
    docsUrl: "https://github.com/ita-poppop/backend.git",
  },
  // 3. AI 기반 실무형 풀사이클 개발
  {
    id: "project4",
    title: "AI 기반 실무형 풀사이클 개발",
    subtitle: "(미용실 실시간 예약 시스템 웹앱)",
    period: "2025.03.01~2025.03.18",
    description:
      "예약 부도 문제를 주제로, 데이터 기반 리서치와 AI 도구(Cursor, ChatGPT, Claude)를 활용해 기획부터 개발까지 전 과정을 단독 수행한 프로젝트입니다. 실사용 흐름을 고려해 예약, 결제, 취소, 알림 기능을 설계하고, JSP와 MySQL 기반으로 MVP를 구현했습니다.",
    impact: "예약·결제·취소·알림 전 기능 구현, ERD 설계 및 JSP 기반 UI 완성\n예약 성공률 향상을 위한 사용자 흐름 중심 기능 설계\nAI 도구 활용을 통한 실무형 개발 경험 확보",
    process: "문제 정의 및 데스크 리서치\n기능 정의 및 ERD 설계\nJSP 기반 화면 구현 및 예약 로직 개발\nAI 도구로 코드 자동화 및 품질 개선",
    tech: "Cursor, ChatGPT, Claude, JSP, Java Servlet, MySQL, Figma, Notion",
    tags: ["풀사이클 개발", "AI 활용", "JSP", "MySQL", "실시간 예약", "MVP 구현"],
    participation: "기획및 개발 전 과정 수행",
    image: "/p4.png",
    liveUrl: "/docs/Full.pdf",
    docsUrl: "https://github.com/kimjaewon6123/scrs.git",
  },
  // 4. 데이터 기반 광고 전략
  {
    id: "project2",
    title: "데이터 기반 광고 전략",
    subtitle: "(네이버 웹툰 쿠키오븐 리디자인)",
    period: "2025.02.20~2025.02.28",
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
    id: "project5",
    title: "교육 플랫폼 전환율 분석",
    subtitle: "(밀크T CCR 향상 프로젝트)",
    period: "2025.04.03~2025.04.13",
    description:
      "밀크T의 약 10만 건 학습 데이터를 기반으로 콘텐츠별 전환율(CCR)을 분석하고, 전환 기여도가 낮은 이북 콘텐츠 유형을 개선 타겟으로 도출한 프로젝트입니다. 학년별·유형별 분석을 통해 AI 콘텐츠의 높은 전환 기여도도 확인했으며, 콘텐츠 추천과 UI 개선 전략을 함께 설계했습니다.",
    impact: "CCR 기반 전환 분석 프레임 수립 및 콘텐츠 유형별 기여도 도출\n전환율 낮은 이북 콘텐츠 분석 → 개선 타깃 선정\nAI 콘텐츠의 전환 효과 확인 및 전략적 확대 제안\n학년별 콘텐츠 소비 특성 시각화 및 UX 개선 방향 설정",
    process: "10만 건 학습 로그 수집 및 CCR 기준 정립\n과목/학년/콘텐츠 유형별 분석 및 시각화\n전환율 하위 콘텐츠 집중 분석 (e북 템플릿 97% 영어)\n개선 대상 콘텐츠 선정 및 전략 제안 도출",
    tech: "Excel, Python(pandas), Notion, Figma",
    tags: ["CCR 분석", "전환율 개선", "데이터 기반 UX", "AI 콘텐츠", "콘텐츠 추천", "UX 전략"],
    participation: "데이터 분석 기반 UX 전략 수립",
    image: "/p5.png",
    liveUrl: "/docs/밀크T.pdf",
    docsUrl: "#",
  },
  {
    id: "project6",
    title: "OpenAI API 기반 서비스 기획 및 개발",
    subtitle: "(MBTI 성향 챗봇 & 논술 분석 플랫폼)",
    period: "2025.04.22~2025.05.15",
    description:
      "두 프로젝트 모두 OpenAI API 및 LLM 기술을 중심으로 진행한 실무형 과제입니다. MBTI 챗봇 프로젝트에서는 16가지 성향별 챗봇을 구축하고, GPT 기반 프롬프트 엔지니어링과 RAG, 메모리 주입을 활용해 성향에 맞는 응답을 설계했습니다. 논술 분석 서비스 프로젝트에서는 OCR, 구조 분석, Rubric 기반 Fine-Tuning 구조를 설계하고, GPT API를 활용한 논술 자동 피드백 시스템을 기획했습니다.",
    impact: "MBTI 유형별 LLM 응답 설계 및 성향 테스트 챗봇 구현\nAgent AI + GPT 조합 기반 논술 분석 흐름 설계\nPrompt + RAG + 평가 기준 설정 등 고도화된 프롬프트 엔지니어링 적용\nGPT API 연동 기반 서비스 프로토타입 기획 및 시연 경험 확보",
    process: "MBTI 데이터 수집 및 성향 응답 설계\n챗봇 UI/UX 및 프론트/백엔드 구조 구현\n논술 OCR → GPT 분석 → 항목별 피드백 시스템 설계\nRubric 기반 평가 기준 정립 및 RLHF 적용 설계\nOpenAI API 연동 테스트 및 프롬프트 품질 개선",
    tech: "OpenAI API, Cursor, GPT-4, Figma, React",
    tags: ["GPT API", "LLM 서비스", "프롬프트 엔지니어링", "RAG", "Agent AI", "논술 분석", "챗봇"],
    participation: "AI 기술 활용 서비스 설계 및 GPT API 연동 실습",
    image: "/p6.png",
    liveUrl: "/docs/AI.pdf",
    docsUrl: "https://github.com/kimjaewon6123/mbti.git",
  },
]

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("project1")
  const [isVisible, setIsVisible] = useState(false)
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null)
  const [showComingSoon, setShowComingSoon] = useState(false)

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

  // 안내 모달 컴포넌트
  function ComingSoonModal({ open, onClose }: { open: boolean, onClose: () => void }) {
    if (!open) return null;
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', borderRadius: 20, padding: '2.5rem 2.5rem 2rem 2.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', minWidth: 280, minHeight: 120, textAlign: 'center', fontSize: '1.15rem', fontWeight: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <span style={{ marginBottom: 12, fontSize: '1.18rem', color: '#2e4a7d', fontWeight: 700, letterSpacing: '-0.5px' }}>곧 업로드 예정입니다</span>
          <button onClick={onClose} style={{ background: '#b7cbe6', color: 'white', border: 'none', borderRadius: 8, padding: '0.7rem 2.2rem', fontWeight: 600, fontSize: '1.08rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(80,120,200,0.13)' }}>확인</button>
        </div>
      </div>
    )
  }

  return (
    <section id="portfolio" className="section-padding bg-[#f8fafc] dark:bg-gradient-to-b dark:from-[#23243a] dark:via-[#3a4a6a] dark:to-[#4a5a7a] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className={cn(
            "section-title text-[#2e4a7d] transition-all duration-700 text-3xl font-extrabold mb-6 text-center leading-tight",
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
            <TabsList className="flex items-center justify-start sm:justify-center bg-transparent w-full min-w-0 px-0 gap-2 sm:gap-4 overflow-x-auto sm:overflow-x-visible scroll-snap-x mandatory sm:w-auto">
              {projects.map((project) => (
                <TabsTrigger
                  key={project.id}
                  value={project.id}
                  className={cn(
                    "portfolio-tab mx-1 min-w-[140px] max-w-[240px] flex-shrink-0 scroll-snap-align-start text-base px-3 py-2 whitespace-nowrap rounded-lg transition-all duration-200",
                    activeTab === project.id
                      ? "text-[#2e4a7d] bg-white/80 font-bold sm:text-[#2e4a7d] sm:bg-transparent sm:font-bold"
                      : "text-[#2e4a7d]/60 bg-white/40 font-semibold sm:text-[#2e4a7d]/80 sm:bg-transparent sm:font-semibold"
                  )}
                >
                  {project.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {projects.map((project) => (
              <TabsContent key={project.id} value={project.id} className="mt-0 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center w-full max-w-full px-0 sm:px-4 mt-8 sm:mt-20">
                  <motion.div
                    whileHover={{ scale: 1.025, boxShadow: '0 8px 32px 0 rgba(80,120,200,0.13)' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="relative aspect-video overflow-hidden rounded-xl bg-white flex items-center justify-center group transition-all duration-300 border-none shadow-none hover:bg-white/90"
                    style={project.id === 'project6' ? { minHeight: 220, marginTop: '-24px', cursor: project.liveUrl && project.liveUrl !== '#' ? 'pointer' : 'default' } : { minHeight: 220, cursor: project.liveUrl && project.liveUrl !== '#' ? 'pointer' : 'default' }}
                    onClick={() => {
                      if (project.liveUrl && project.liveUrl !== '#') {
                        window.open(project.liveUrl, '_blank');
                      }
                    }}
                  >
                    <div className="w-full h-full" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image && project.image !== "/placeholder.svg?height=600&width=800" ? project.image : "/p1.png"}
                          alt={project.title}
                          fill
                          className={
                            project.id === 'project3' || project.id === 'project6'
                              ? "object-contain group-hover:scale-105 transition-transform duration-500"
                              : "object-cover group-hover:scale-105 transition-transform duration-500"
                          }
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                          style={project.id === 'project6'
                            ? {
                                minWidth: 0,
                                objectPosition: 'center top',
                                maxWidth: '90%',
                                maxHeight: '90%',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                padding: '0.2rem',
                              }
                            : project.id === 'project3'
                            ? {
                                minWidth: 0,
                                objectPosition: 'center top',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                padding: '0.2rem',
                              }
                            : { minWidth: 0, objectPosition: 'center top' }
                          }
                        />
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex flex-col justify-center gap-3 p-2 sm:gap-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-2 gap-1 sm:gap-0">
                      <h3 className="text-lg sm:text-2xl font-bold text-[#2e4a7d] mb-0.5 leading-tight sm:mb-1 sm:leading-tight break-keep max-w-full">
                        {project.title}
                      </h3>
                      <div className="flex flex-col items-start sm:items-end text-xs sm:text-base md:text-lg text-muted-foreground font-medium sm:ml-4 mt-1 sm:mt-0">
                        {project.period && <span className="font-semibold whitespace-nowrap max-w-full truncate">{project.period}</span>}
                        {project.participation && <span className="whitespace-nowrap max-w-full truncate">{project.participation}</span>}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground mb-1 font-semibold sm:text-lg sm:mb-2">{project.subtitle}</span>
                    <p className="text-foreground text-sm sm:text-base md:text-lg mb-2 sm:mb-3 leading-relaxed">{project.description}</p>
                    <div className="mb-1 sm:mb-2">
                      <span className="font-bold text-primary mr-2 sm:mr-3">주요 성과</span>
                      <span className="text-foreground text-xs sm:text-sm md:text-base">{project.impact}</span>
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <span className="font-bold text-primary mr-2 sm:mr-3">프로세스</span>
                      <span className="text-foreground text-xs sm:text-sm md:text-base">{project.process}</span>
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <span className="font-bold text-primary mr-2 sm:mr-3">활용 도구</span>
                      <span className="text-foreground text-xs sm:text-sm md:text-base">{project.tech}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        asChild
                        className="bg-[#b7cbe6] hover:bg-[#9AB2D8] text-white font-bold px-3 py-1.5 rounded-full shadow-lg text-xs"
                      >
                        <button
                          onClick={() => {
                            if (project.id === 'project3' || project.id === 'project6') {
                              setSelectedPDF(project.liveUrl);
                            } else {
                              setSelectedPDF(project.liveUrl);
                            }
                          }}
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          <span>PDF 미리보기</span>
                        </button>
                      </Button>
                      {project.id !== "project1" && project.id !== "project2" && project.id !== "project5" && (
                        <Button
                          asChild
                          className="bg-[#2d333b] hover:bg-[#1f2428] text-white font-bold px-3 py-1.5 rounded-full shadow-lg text-xs"
                        >
                          <a href={project.docsUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-1" />
                            <span>Git</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {selectedPDF && (
        <PDFModal
          isOpen={!!selectedPDF}
          onClose={() => setSelectedPDF(null)}
          pdfUrl={selectedPDF}
        />
      )}
      <ComingSoonModal open={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </section>
  )
}
