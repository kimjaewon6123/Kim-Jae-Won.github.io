"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  FileText,
  Users,
  GitBranch,
  Workflow,
  Figma,
  FileSpreadsheet,
  FileCode2,
  Trello,
  MessageSquare,
  Bot,
} from "lucide-react"

const skills = [
  {
    name: "실무기획",
    icon: <FileText className="h-10 w-10 mb-4 text-primary" />,
    description: "서비스 개선 계획 / 벤치마킹 / IA 설계 / 사용자 플로우 / 와이어프레임 / 프로토타입 / 기능 명세서",
  },
  {
    name: "전략 기반 기획",
    icon: <Workflow className="h-10 w-10 mb-4 text-primary" />,
    description: "페르소나 설계 / 사용자 여정 지도 / 서비스 블루프린트 / 데이터 기반 설계 / 애자일 플래닝",
  },
  {
    name: "AI 활용 기획",
    icon: <Bot className="h-10 w-10 mb-4 text-primary" />,
    description: "Prompt Engineering / Vibe Coding / ChatGPT 실무 활용",
  },
  {
    name: "협업 및 소통",
    icon: <Users className="h-10 w-10 mb-4 text-primary" />,
    description: "팀 커뮤니케이션 / 이해관계자 관리 / 요구사항 분석 / 문서화",
  },
]

const tools = [
  { name: "Figma", icon: <Figma className="h-8 w-8 mb-3 text-secondary" /> },
  { name: "PowerPoint", icon: <FileText className="h-8 w-8 mb-3 text-secondary" /> },
  { name: "Excel", icon: <FileSpreadsheet className="h-8 w-8 mb-3 text-secondary" /> },
  { name: "Notion", icon: <FileCode2 className="h-8 w-8 mb-3 text-secondary" /> },
  { name: "Jira", icon: <Trello className="h-8 w-8 mb-3 text-secondary" /> },
  { name: "Slack", icon: <MessageSquare className="h-8 w-8 mb-3 text-secondary" /> },
  { name: "Python", icon: <GitBranch className="h-8 w-8 mb-3 text-secondary" /> },
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
      className="section-padding bg-gradient-to-b from-background to-primary/5 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50 z-0"></div>

      {/* Decorative blobs */}
      <div className="absolute -right-32 top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -left-32 bottom-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2
          className={cn(
            "section-title text-primary transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          I can do
        </h2>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-24 transition-all duration-700 delay-300",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          {skills.map((skill, index) => (
            <Card key={index} className="card-hover border-none shadow-md overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 flex flex-col items-center justify-center relative z-10">
                <div className="transform group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                <p className="text-sm text-muted-foreground text-center">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2
          className={cn(
            "section-title text-primary transition-all duration-700 delay-500",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          and I can do too
        </h2>

        <div
          className={cn(
            "grid grid-cols-3 md:grid-cols-7 gap-4 max-w-4xl mx-auto transition-all duration-700 delay-700",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          {tools.map((tool, index) => (
            <Card key={index} className="card-hover border-none shadow-sm group">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="transform group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                <h3 className="text-sm font-medium">{tool.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
