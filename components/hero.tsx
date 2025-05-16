"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Decorative shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="absolute top-10 left-10 text-sm font-light tracking-wider opacity-70 hidden md:block">
        <p
          className={cn(
            "transition-all duration-1000 delay-300",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          PRODUCT MANAGER
        </p>
      </div>

      <div className="absolute top-10 right-10 transform rotate-90 origin-top-right text-sm font-light tracking-wider opacity-70 hidden md:block">
        <p
          className={cn(
            "transition-all duration-1000 delay-500",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          PORTFOLIO 2025
        </p>
      </div>

      <div className="container mx-auto px-4 text-center md:text-left md:max-w-3xl lg:max-w-5xl relative z-10">
        <div className={cn("transition-all duration-1000", isVisible ? "opacity-100" : "opacity-0 translate-y-10")}>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-6">
            <span className="hero-text-gradient shimmer">PRODUCT</span>
            <br />
            <span className="hero-text-gradient shimmer">MANAGER</span>
            <br />
            <span className="relative inline-block mt-4 text-foreground">
              <span className="relative z-10">김재원</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-secondary/20 -z-10"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl mt-6 text-muted-foreground">
            변화하는 기술을 <span className="highlight-text">빠르게 흡수</span>하고,
            <br />
            <span className="highlight-text">현실적인 해결책</span>으로 이어내는 기획자
          </p>
        </div>

        <div
          className={cn(
            "mt-12 transition-all duration-1000 delay-700",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          <Button
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            자세히 보기 <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
          </Button>
        </div>
      </div>

      <div className="scroll-indicator">
        <span className="text-xs text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </section>
  )
}
