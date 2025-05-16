"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

const experiences = [
  {
    date: "2024.12 - 2025.07",
    title: "천재교육 에듀테크 PM 서비스/콘텐츠 기획자 10기",
    description:
      "천재교육 주 교구사이트몰 사용성을 개선하고 서비스 활성화를 목표로 진행되었으며, 고객경험을 혁신하기 위한 다양한 UI/UX 개선안과 유저 리서치를 통한 새로운 기능을 제안 및 구현",
  },
  {
    date: "2025.02 - 2025.07",
    title: "대학생 연합 IT 동아리 IT'S TIME",
    description: "대학생 연합 IT 동아리에서 서비스 기획 및 프로토타입 제작 담당",
  },
  {
    date: "2024.03 - 2025.02",
    title: "한국공학대학교 NUFI 동아리 기획부장",
    description: "동아리 내 기획부를 총괄하며 다양한 프로젝트 기획 및 관리",
  },
  {
    date: "2024.09 - 2024.12",
    title: "패스트캠퍼스 EXPORT PM/PO 4기",
    description: "Product로 세상을 변화시키는 PM/PO의 모든 것 과정 수료",
  },
]

export default function ExperienceTimeline() {
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

    const section = document.getElementById("experience")
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  return (
    <section id="experience" className="section-padding bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2
          className={cn(
            "section-title text-primary transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          Experience
        </h2>

        <div
          className={cn(
            "max-w-3xl mx-auto transition-all duration-700 delay-300",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          <div className="timeline">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="timeline-item border-none shadow-md gradient-border"
                style={{
                  transitionDelay: `${300 + index * 150}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.7s ease-out",
                }}
              >
                <div className="p-4">
                  <div className="timeline-date">{exp.date}</div>
                  <div className="timeline-title">{exp.title}</div>
                  <div className="timeline-content">{exp.description}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
