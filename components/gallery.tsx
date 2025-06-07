"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import PDFModal from "./PDFModal"

type GalleryItem = {
  id: string;
  title: string;
  images: string[];
  thumbnail?: string;
}

const galleryCategories = [
  {
    id: "documents",
    title: "기획문서",
    items: [
      {
        id: "wf1",
        title: "POP-POP 화면설계서",
        images: [
          "/pop/pp1.jpg",
          "/pop/pp2.jpg",
          "/pop/pp3.jpg",
          "/pop/pp4.jpg",
          "/pop/pp5.jpg",
          "/pop/wire1.jpg",
          "/pop/wire2.jpg",
          "/pop/wire3.jpg",
          "/pop/wire4.jpg"
        ],
        thumbnail: "/pop/pp1.jpg",
      },
      {
        id: "wire3",
        title: "리뉴얼 기출로 화면설계서",
        images: [
          "/ki/기출로1.jpg",
          "/ki/기출로2.jpg",
          "/ki/기출로3.jpg"
        ],
        thumbnail: "/ki/기출로1.jpg",
      },
      {
        id: "doc1",
        title: "POP-POP IA",
        images: [
          "/pop/popia.jpg"
        ],
        thumbnail: "/pop/popia.jpg",
      },
      {
        id: "doc2",
        title: "POP-POP 메뉴구조도",
        images: [
          "/pop/menu1.jpg"
        ],
        thumbnail: "/pop/menu1.jpg",
      },
      {
        id: "doc3",
        title: "POP-POP 와이어프레임임",
        images: [
          "/pop/wire1.jpg"
        ],
        thumbnail: "/pop/wire1.jpg",
      },
      {
        id: "doc4",
        title: "POP-POP 기능명세서",
        images: [
          "/pop/기능.jpg"
        ],
        thumbnail: "/pop/기능.jpg",
      },
      {
        id: "doc5",
        title: "T 셀파몰 와이어프레임",
        images: [
          "/t-wire1.jpg",
          "/t-wire2.jpg"
        ],
        thumbnail: "/t-wire1.jpg",
      },
      {
        id: "doc6",
        title: "WBS",
        images: [
          "/WBS.jpg"
        ],
        thumbnail: "/WBS.jpg",
      },
      {
        id: "doc7",
        title: "유저 리서치",
        images: [
          "/user.jpg"
        ],
        thumbnail: "/user.jpg",
      },
      {
        id: "doc8",
        title: "경쟁사 분석",
        images: [
          "/경쟁사.jpg"
        ],
        thumbnail: "/경쟁사.jpg",
      },
    ],
  },
  {
    id: "etc",
    title: "기타문서",
    items: [
      { id: "etc1", title: "POP POP 시스템 기능 흐름도", images: ["/pop/sy1.jpg"], thumbnail: "/pop/sy1.jpg" },
      { id: "etc2", title: "풀사이클 유즈케이스 시나리오", images: [
        "/use/use1.jpg",
        "/use/use2.jpg",
        "/use/use3.jpg",
        "/use/use4.jpg",
        "/use/use5.jpg",
        "/use/use6.jpg",
        "/use/use7.jpg",
        "/use/use8.jpg",
        "/use/use9.jpg"
      ], thumbnail: "/use/use1.jpg" },
      { id: "etc3", title: "풀사이클 요구사항 정의서", images: [
        "/demand1.jpg",
        "/demand2.jpg",
        "/demand3.jpg",
        "/demand4.jpg",
        "/demand5.jpg"
      ], thumbnail: "/demand1.jpg" },
      { id: "etc4", title: "풀사이클 유즈케이스 다이어그램", images: ["/use1.jpg"], thumbnail: "/use1.jpg" },
      { id: "etc5", title: "풀사이클 시퀀스 다이어그램", images: [
        "/seq1.jpg",
        "/seq2.jpg",
        "/seq3.jpg",
        "/seq4.jpg",
        "/seq5.jpg",
        "/seq6.jpg",
        "/seq7.jpg"
      ], thumbnail: "/seq1.jpg" },
      { id: "etc6", title: "풀사이클 ERD", images: ["/erd.jpg"], thumbnail: "/erd.jpg" },
      { id: "etc7", title: "네이버 웹툰 쿠키 충전소 이용자의 광고 선택 요인 분석", images: ["/naver.jpg"], thumbnail: "/naver.jpg" },
    ],
  },
]

// pop 폴더 이미지 리스트
const popImages = [
  "/pop/pp1.jpg",
  "/pop/pp2.jpg",
  "/pop/pp3.jpg",
  "/pop/pp4.jpg",
  "/pop/pp5.jpg",
];

// p1~p6 이미지 리스트
const pImages = [
  "/p1.jpg",
  "/p2.jpg",
  "/p3.jpg",
  "/p4.jpg",
  "/p5.jpg",
  "/p6.jpg",
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("documents")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedTitle, setSelectedTitle] = useState<string>("")
  const [isVisible, setIsVisible] = useState(false)
  const [showPopGallery, setShowPopGallery] = useState(false)
  const [popIndex, setPopIndex] = useState(0)
  const [slideImages, setSlideImages] = useState<string[]>([])
  const [slideIndex, setSlideIndex] = useState(0)
  const [showDocxModal, setShowDocxModal] = useState(false)
  const [showPDFModal, setShowPDFModal] = useState(false)
  const [pdfUrl, setPdfUrl] = useState("")

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

  useEffect(() => {
    // 이미지 프리로딩
    const preloadImages = () => {
      galleryCategories.forEach(category => {
        category.items.forEach(item => {
          if (item.images && Array.isArray(item.images)) {
            item.images.forEach(imgPath => {
              if (typeof imgPath === 'string' && imgPath.trim() !== '') {
                const img = new window.Image();
                img.src = imgPath;
              }
            });
          }
        });
      });
    };
    preloadImages();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPdfUrl(`${window.location.origin}/네이버%20웹툰%20쿠키%20충전소%20이용자의%20광고%20선택%20요인%20분석.pdf`)
    }
  }, [])

  const openImage = (images: string[], title: string) => {
    setSlideImages(images && images.length > 0 ? images : ["/placeholder.svg?height=600&width=800"])
    setSlideIndex(0)
    setSelectedTitle(title)
  }

  const closeImage = () => {
    setSlideImages([])
    setSelectedTitle("")
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

  // 기존 openImage 함수 대체: popover 클릭 시 popImages 전체를 보여주도록
  const openPopGallery = () => {
    setSelectedImage(null);
    setSelectedTitle("");
    setShowPopGallery(true);
    setPopIndex(0);
  }

  return (
    <section
      id="gallery"
      className="section-padding relative overflow-hidden bg-[#f8fafc] dark:bg-gradient-to-b dark:from-[#23243a] dark:via-[#3a4a6a] dark:to-[#4a5a7a]"
    >
      {/* 포인트 블러/그라데이션 원 */}
      <div className="absolute -top-28 -right-28 w-[340px] h-[300px] rounded-full bg-gradient-to-br from-[#e6e6fa] via-[#e6f2fb] to-[#b7cbe6] opacity-50 blur-2xl z-0" />
      <div className="absolute -bottom-20 -left-32 w-[260px] h-[220px] rounded-full bg-gradient-to-tr from-[#b7cbe6] via-[#e6fff8] to-[#a3b8e6] opacity-30 blur-2xl z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className={cn(
            "section-title text-[#2e4a7d]",
          )}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
        >
          Document
        </motion.h2>

        <motion.div
          className=""
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.15 }}
        >
          <Tabs defaultValue="documents" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                  style={{ alignItems: 'flex-start' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ type: "spring", stiffness: 60, damping: 18 }}
                >
                  {category.items.map((item, idx) => {
                    const [imgError, setImgError] = useState(false);
                    return (
                      <motion.div
                        key={item.id}
                        className="gallery-item cursor-pointer card-hover gradient-border w-full min-w-0"
                        onClick={() => {
                          if (category.id === 'etc' && item.id === 'etc7') {
                            setPdfUrl("/docs/네이버 웹툰 쿠키 충전소 이용자의 광고 선택 요인 분석.pdf");
                            setShowPDFModal(true);
                          } else {
                            openImage(item.images || [], item.title);
                          }
                        }}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.1 }}
                        style={category.id === 'wireframes' && item.id === 'wf1' ? { marginTop: 0, marginBottom: 0, alignSelf: 'auto' } : {}}
                      >
                        <div className="relative aspect-square sm:aspect-video overflow-hidden rounded-lg shadow-md p-1 sm:p-0 w-full min-w-0 group bg-white">
                          <motion.div
                            className="gallery-overlay absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity duration-300 z-10"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ZoomIn className="h-8 w-8 mb-2 text-white" />
                            <h3 className="text-xs sm:text-base font-bold text-center break-words w-full px-1 sm:px-2 text-white drop-shadow-lg">{item.title}</h3>
                          </motion.div>
                          {item.thumbnail && !imgError ? (
                            <div className="absolute inset-0 w-full h-full">
                              <Image
                                src={item.thumbnail}
                                alt={item.title + ' 썸네일'}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className={
                                  category.id === 'etc' && item.id === 'etc7'
                                    ? 'object-contain bg-white rounded-lg absolute inset-0 w-full h-full mx-auto block z-0 p-6'
                                    : 'object-cover absolute inset-0 w-full h-full mx-auto block z-0'
                                }
                                style={{ objectPosition: 'center top', inset: 0, transform: undefined, padding: '0.2rem' }}
                                priority={idx === 0}
                                loading={idx === 0 ? 'eager' : 'lazy'}
                                quality={100}
                                onError={() => setImgError(true)}
                              />
                            </div>
                          ) : (
                            <div className="absolute inset-0 w-full h-full bg-gray-100 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">썸네일 없음</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <Dialog open={slideImages.length > 0} onOpenChange={closeImage}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <DialogTitle className="sr-only">{selectedTitle}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeImage}
              className="absolute right-2 top-2 z-10 bg-background/80 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="relative w-full flex flex-col items-center">
              <div className="w-full flex justify-center items-center min-h-[60vh]">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSlideIndex((slideIndex-1+slideImages.length)%slideImages.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-background/70"
                  aria-label="이전 이미지"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                {slideImages[slideIndex] && typeof slideImages[slideIndex] === 'string' && slideImages[slideIndex].trim() !== '' ? (
                  <Image
                    src={slideImages[slideIndex]}
                    alt={`슬라이드 이미지 크게보기`}
                    width={1200}
                    height={900}
                    className="object-contain rounded-xl shadow-lg max-h-[80vh] max-w-[90vw] w-full h-auto mx-2 sm:mx-12"
                    sizes="(max-width: 768px) 90vw, 1200px"
                    priority
                    style={slideImages[slideIndex].includes('/p6') ? { marginTop: '16px' } : {}}
                  />
                ) : (
                  <div className="object-contain rounded-xl shadow-lg max-h-[80vh] max-w-[90vw] w-full h-auto mx-2 sm:mx-12 flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400 text-xs">이미지 없음</span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSlideIndex((slideIndex+1)%slideImages.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-background/70"
                  aria-label="다음 이미지"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
              <div className="flex flex-row items-center justify-center gap-2 w-full overflow-x-auto py-4 mt-2">
                {slideImages.map((img, i) =>
                  img && typeof img === 'string' && img.trim() !== '' ? (
                    <img
                      key={`${img}-${i}`}
                      src={img}
                      alt={`슬라이드 이미지 ${i+1}`}
                      className={`object-contain rounded-lg shadow-md max-h-[60px] max-w-[60px] border ${slideIndex===i?"border-primary ring-2 ring-primary":"border-transparent"}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSlideIndex(i)}
                    />
                  ) : null
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showPopGallery} onOpenChange={() => setShowPopGallery(false)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <DialogTitle className="sr-only">POP 이미지 모음</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPopGallery(false)}
              className="absolute right-2 top-2 z-10 bg-background/80 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="relative w-full flex flex-col items-center">
              <div className="w-full flex justify-center items-center min-h-[60vh]">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPopIndex((popIndex-1+popImages.length)%popImages.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-background/70"
                  aria-label="이전 이미지"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <img
                  src={popImages[popIndex]}
                  alt={`POP 이미지 크게보기`}
                  className="object-contain rounded-xl shadow-lg max-h-[80vh] max-w-[90vw] w-full h-auto mx-2 sm:mx-12"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPopIndex((popIndex+1)%popImages.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-background/70"
                  aria-label="다음 이미지"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
              <div className="flex flex-row items-center justify-center gap-2 w-full overflow-x-auto py-4 mt-2">
                {popImages.map((img, i) => (
                  <img
                    key={img}
                    src={img}
                    alt={`POP 이미지 ${i+1}`}
                    className={`object-contain rounded-lg shadow-md max-h-[60px] max-w-[60px] border ${popIndex===i?"border-primary ring-2 ring-primary":"border-transparent"}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setPopIndex(i)}
                  />
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* PDFModal 추가 */}
        <PDFModal
          isOpen={showPDFModal}
          onClose={() => setShowPDFModal(false)}
          pdfUrl={pdfUrl}
        />
      </div>
    </section>
  )
}