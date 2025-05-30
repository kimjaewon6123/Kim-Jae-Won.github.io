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
      ?대쫫 : 源?ъ썝 (KIM JAE WON)
      ?앸뀈?붿씪 : 2000.07.20
      ?곕씫泥?: +82 10 7751 6123
      ?대찓??: twice6123@naver.com
      SNS : @w0n.zip
      ?숇젰 : ?쒓뎅怨듯븰??숆탳 IT寃쎌쁺?숆낵 (7??議몄뾽?덉젙)
      蹂듭닔?꾧났 : e-鍮꾩쫰?덉뒪寃쎌쁺怨?      ?숈젏 : 3.3 / 4.5
    `,
  },
  {
    content: `
      寃쎈젰 : ?좎엯
      
      ?명꽩쨌??명솢??:
      ??泥쒖옱援먯쑁 ?먮??뚰겕 PM ?쒕퉬??肄섑뀗痢?湲고쉷??10湲?(2024.12 - 2025.07)
      ????숈깮 ?고빀 IT ?숈븘由?IT'S TIME (2025.02 - 2025.07)
      ???쒓뎅怨듯븰??숆탳 NUFI ?숈븘由?湲고쉷遺??(2024.03 - 2025.02)
      ???⑥뒪?몄틺?쇱뒪 EXPORT PM/PO 4湲?(2024.09 - 2024.12)
    `,
  },
  {
    content: `
      ?먭꺽利?:
      ??1醫낅낫?듭슫?꾨㈃??(2019.12)
      ???뺣낫湲곗닠?먭꺽(ITQ) ?꾨옒?쒓? A?깃툒 (2013.03)
      ???뺣낫湲곗닠?먭꺽(ITQ) ?쒓??뚯썙?ъ씤???쒖눥) B?깃툒 (2012.12)
      
      援먯쑁 :
      ??泥쒖옱援먯쑁 ?먮??뚰겕 PM ?쒕퉬??肄섑뀗痢?湲고쉷??10湲?(2024.12 - 2025.07)
      ???⑥뒪?몄틺?쇱뒪 EXPORT PM/PO 4湲?(2024.09 - 2024.12)
    `,
  },
]

const tags = [
  "#湲고쉷??,
  "#PM",
  "#PO",
  "#?쒕퉬?ㅺ린??,
  "#UX?ㅺ퀎",
  "#??댁뼱?꾨젅??,
  "#?꾨줈?좏???,
  "#?좎옄??,
  "#AI?쒖슜湲고쉷",
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
                      <p className="text-lg font-medium">???뚯븘蹂닿린</p>
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
