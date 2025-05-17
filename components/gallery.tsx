"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const galleryCategories = [
  {
    id: "wireframes",
    title: "와이어프레임",
    items: [
      {
        id: "wire1",
        title: "천재교육 교구몰 와이어프레임",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "wire2",
        title: "IT'S TIME 프로젝트 와이어프레임",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "wire3",
        title: "NUFI 웹서비스 와이어프레임",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "wire4",
        title: "패스트캠퍼스 프로젝트 와이어프레임",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
  {
    id: "prototypes",
    title: "프로토타입",
    items: [
      {
        id: "proto1",
        title: "천재교육 교구몰 프로토타입",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "proto2",
        title: "IT'S TIME 프로젝트 프로토타입",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "proto3",
        title: "NUFI 웹서비스 프로토타입",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "proto4",
        title: "패스트캠퍼스 프로젝트 프로토타입",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
  {
    id: "documents",
    title: "기획 문서",
    items: [
      {
        id: "doc1",
        title: "서비스 기획서",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "doc2",
        title: "사용자 여정 지도",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "doc3",
        title: "서비스 블루프린트",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "doc4",
        title: "기능 명세서",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "doc5",
        title: "페르소나 설계",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
]

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("wireframes")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedTitle, setSelectedTitle] = useState<string>("")
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

    const section = document.getElementById("gallery")
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  const openImage = (image: string, title: string) => {
    setSelectedImage(image)
    setSelectedTitle(title)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }

  const nextCategory = () => {
    const currentIndex = galleryCategories.findIndex((cat) => cat.id === activeTab)
    const nextIndex = currentIndex === galleryCategories.length - 1 ? 0 : currentIndex + 1
    setActiveTab(galleryCategories[nextIndex].id)
  }

  const prevCategory = () => {
    const currentIndex = galleryCategories.findIndex((cat) => cat.id === activeTab)
    const prevIndex = currentIndex === 0 ? galleryCategories.length - 1 : currentIndex - 1
    setActiveTab(galleryCategories[prevIndex].id)
  }

  return (
    <section
      id="gallery"
      className="section-padding bg-gradient-to-b from-primary/5 to-background relative overflow-hidden"
    >
      {/* 자연스러운 블러/그라데이션 원 배경 (통일감+변형) */}
      <div className="absolute -top-36 -right-28 w-[380px] h-[340px] rounded-full bg-gradient-to-br from-[#e6e6fa] via-[#e6f2fb] to-[#b7cbe6] opacity-60 blur-[80px] z-0" />
      <div className="absolute -bottom-24 -left-36 w-[300px] h-[260px] rounded-full bg-gradient-to-tr from-[#b7cbe6] via-[#e6fff8] to-[#a3b8e6] opacity-40 blur-[60px] z-0" />
      {/* subtle noise overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'url(/noise.png)', opacity: 0.07}} />
      {/* linear-gradient overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'linear-gradient(100deg,rgba(255,255,255,0.18)_0%,rgba(183,203,230,0.10)_100%)'}} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className={cn(
            "section-title text-[#2e4a7d]",
          )}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
        >
          Design Gallery
        </motion.h2>

        <motion.div
          className=""
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.15 }}
        >
          <Tabs defaultValue="wireframes" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-wrap max-sm:flex-nowrap items-center justify-center gap-2 sm:gap-4 mb-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevCategory}
                className="border-primary/20 hover:bg-primary/5 hover:text-primary rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <TabsList className="flex items-center justify-start bg-transparent w-full min-w-0 px-0 gap-1 max-sm:overflow-x-auto max-sm:scrollbar-hide max-sm:scroll-snap-x max-sm:mandatory max-sm:w-full max-sm:min-w-0 max-sm:gap-1 sm:flex-nowrap sm:overflow-x-visible sm:w-auto sm:gap-2" style={{ WebkitOverflowScrolling: 'touch' }}>
                {galleryCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="portfolio-tab mx-1 min-w-[110px] max-w-[180px] flex-shrink-0 scroll-snap-align-start text-xs sm:text-sm px-2 sm:px-3 py-1.5 whitespace-nowrap"
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              <Button
                variant="outline"
                size="icon"
                onClick={nextCategory}
                className="border-primary/20 hover:bg-primary/5 hover:text-primary rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {galleryCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-1 sm:px-0 w-full max-w-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ type: "spring", stiffness: 60, damping: 18 }}
                >
                  {category.items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="gallery-item cursor-pointer card-hover gradient-border w-full min-w-0"
                      onClick={() => openImage(item.image, item.title)}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.1 }}
                    >
                      <div className="relative aspect-square sm:aspect-video overflow-hidden rounded-lg shadow-md p-1 sm:p-0 w-full min-w-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px" style={{ minWidth: 0 }} />
                        <div className="gallery-overlay">
                          <ZoomIn className="h-8 w-8 mb-2 text-white" />
                          <h3 className="text-xs sm:text-base font-bold text-center break-words w-full px-1 sm:px-2">{item.title}</h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <Dialog open={!!selectedImage} onOpenChange={() => closeImage()}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeImage}
              className="absolute right-2 top-2 z-10 bg-background/80 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="relative aspect-square sm:aspect-video w-full">
              {selectedImage && (
                <Image src={selectedImage || "/placeholder.svg"} alt={selectedTitle} fill className="object-contain" />
              )}
            </div>
            <div className="p-4 bg-background">
              <h3 className="text-xl font-bold">{selectedTitle}</h3>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
