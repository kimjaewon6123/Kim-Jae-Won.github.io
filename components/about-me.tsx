"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

const profileData = [
  {
    content: `
      이름 : 김재원 (KIM JAE WON)
      생년월일 : 2000.07.20
      연락처 : +82 10 7751 6123
      이메일 : twice6123@naver.com
      SNS : @w0n.zip
      학력 : 한국공학대학교 IT경영학과 (7월 졸업예정)
      복수전공 : e-비즈니스경영과
      학점 : 3.3 / 4.5
    `,
  },
  {
    content: `
      경력 : 신입
      
      인턴·대외활동 :
      • 천재교육 에듀테크 PM 서비스/콘텐츠 기획자 10기 (2024.12 - 2025.07)
      • 대학생 연합 IT 동아리 IT'S TIME (2025.02 - 2025.07)
      • 한국공학대학교 NUFI 동아리 기획부장 (2024.03 - 2025.02)
      • 패스트캠퍼스 EXPORT PM/PO 4기 (2024.09 - 2024.12)
    `,
  },
  {
    content: `
      자격증 :
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

export default function AboutMe() {
  const [activeProfile, setActiveProfile] = useState(0)

  const nextProfile = () => {
    setActiveProfile((prev) => (prev === profileData.length - 1 ? 0 : prev + 1))
  }

  const prevProfile = () => {
    setActiveProfile((prev) => (prev === 0 ? profileData.length - 1 : prev - 1))
  }

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 blob bg-primary/5 z-0"></div>
      <div className="absolute top-32 -left-16 w-48 h-48 blob-small bg-secondary/5 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="relative">
            <h2 className="section-title text-left text-primary mb-8 animate-slideInLeft">About me</h2>

            <div className="relative z-10 animate-fadeIn">
              <Card className="overflow-hidden border-none shadow-lg gradient-border">
                <div className="relative aspect-[3/4] bg-muted">
                  <Image src="/placeholder.svg?height=600&width=450" alt="Profile" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <p className="text-lg font-medium">더 알아보기</p>
                      <p className="flex items-center text-sm group">
                        <ExternalLink className="mr-1 h-3 w-3 group-hover:rotate-45 transition-transform duration-300" />{" "}
                        CLICK HERE!
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/10 -z-10 rounded-lg animate-float"></div>
          </div>

          <div className="animate-slideInRight">
            <Card className="mb-8 border-none shadow-lg glass-card">
              <CardContent className="p-6">
                <div className="flex justify-end gap-2 mb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevProfile}
                    className="h-8 w-8 border-primary/20 hover:bg-primary/5 hover:text-primary rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextProfile}
                    className="h-8 w-8 border-primary/20 hover:bg-primary/5 hover:text-primary rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="min-h-[250px] whitespace-pre-line leading-relaxed">
                  {profileData[activeProfile].content}
                </div>
              </CardContent>
            </Card>

            <div className="tag-cloud">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className={`tag ${index % 3 === 0 ? "animate-pulse-slow" : ""}`}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
