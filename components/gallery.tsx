"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

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
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2
          className={cn(
            "section-title text-primary transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          Design Gallery
        </h2>

        <div
          className={cn(
            "transition-all duration-700 delay-300",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          <Tabs defaultValue="wireframes" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-center mb-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevCategory}
                className="mr-4 border-primary/20 hover:bg-primary/5 hover:text-primary rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <TabsList className="bg-transparent">
                {galleryCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="portfolio-tab mx-1">
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              <Button
                variant="outline"
                size="icon"
                onClick={nextCategory}
                className="ml-4 border-primary/20 hover:bg-primary/5 hover:text-primary rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {galleryCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="gallery-item cursor-pointer card-hover gradient-border"
                      onClick={() => openImage(item.image, item.title)}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                        <div className="gallery-overlay">
                          <ZoomIn className="h-8 w-8 mb-2 text-white" />
                          <h3 className="text-xl font-bold text-center">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

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
