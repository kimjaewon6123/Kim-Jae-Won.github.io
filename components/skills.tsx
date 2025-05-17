"use client"

import { useEffect, useState, useRef } from "react"
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
import { motion, useAnimation, useMotionValue } from "framer-motion"

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

const toolImages = [
  { src: "/1.png", alt: "tool1" },
  { src: "/2.png", alt: "tool2" },
  { src: "/3.png", alt: "tool3" },
  { src: "/4.png", alt: "tool4" },
  { src: "/5.png", alt: "tool5" },
  { src: "/6.png", alt: "tool6" },
  { src: "/7.png", alt: "tool7" },
  { src: "/8.png", alt: "tool8" },
  { src: "/9.png", alt: "tool9" },
  { src: "/10.png", alt: "tool10" },
  { src: "/11.png", alt: "tool11" },
  { src: "/12.png", alt: "tool12" },
]

// 반응형 크기 계산 함수
function getResponsiveSizes() {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1100;
  let areaW = 1100, areaH = 320, img = 64;
  if (vw <= 500) { // 모바일
    areaW = Math.min(vw - 32, 480);
    areaH = Math.max(120, Math.floor(areaW * 0.5));
    img = Math.max(28, Math.floor(areaW / 11));
  } else if (vw <= 900) { // 태블릿
    areaW = Math.min(vw - 64, 800);
    areaH = Math.max(180, Math.floor(areaW * 0.4));
    img = Math.max(36, Math.floor(areaW / 15));
  }
  return { areaW, areaH, img };
}

function ScatterToolImage({ src, alt, x, y, scale, rotation, imgSize }: {
  src: string;
  alt: string;
  x: any;
  y: any;
  scale: any;
  rotation: any;
  imgSize: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) {
    // SSR에서는 투명한 placeholder span만 렌더
    return (
      <span
        style={{
          position: "absolute",
          width: imgSize + "px",
          height: imgSize + "px",
          left: "0px",
          top: "0px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    );
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      style={{
        position: "absolute",
        width: imgSize + "px",
        height: imgSize + "px",
        touchAction: "none",
        userSelect: "none",
        zIndex: 2,
        left: "0px",
        top: "0px",
        x,
        y,
        scale,
        rotate: rotation,
      }}
      initial={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.13, boxShadow: '0 4px 16px 0 rgba(80,120,200,0.18)' }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      draggable={false}
    />
  );
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)

  // 1. 초기값 고정 (SSR/CSR 동일)
  const [sizes, setSizes] = useState({ areaW: 900, areaH: 320, img: 64 });

  // 2. motionValue를 useRef로 한 번만 생성
  const iconsRef = useRef(
    toolImages.map(() => ({
      x: useMotionValue(0),
      y: useMotionValue(0),
      scale: useMotionValue(1),
      rotation: useMotionValue(0),
      vx: 0,
      vy: 0,
    }))
  );

  // 3. 사이즈가 바뀔 때 값만 재설정 (useEffect)
  useEffect(() => {
    iconsRef.current.forEach(icon => {
      icon.x.set(Math.random() * (sizes.areaW - sizes.img));
      icon.y.set(Math.random() * (sizes.areaH - sizes.img));
      icon.scale.set(1);
      icon.rotation.set((Math.random() - 0.5) * 40);
      icon.vx = (Math.random() - 0.5) * 1.2;
      icon.vy = (Math.random() - 0.5) * 1.2;
    });
  }, [sizes.areaW, sizes.areaH, sizes.img]);

  // 4. 마운트 후에만 실제 크기 반영
  useEffect(() => {
    function handleResize() {
      setSizes(getResponsiveSizes());
    }
    handleResize(); // 마운트 후 1회
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const areaRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // 애니메이션 루프
  useEffect(() => {
    let raf: number;
    function animateIcons() {
      const pointer = pointerRef.current;
      const icons = iconsRef.current;
      const ICON_COUNT = toolImages.length;
      const REPULSION_RADIUS = Math.max(40, sizes.img * 1.3);
      const CURSOR_RADIUS = Math.max(60, sizes.img * 2.2);
      // 1. 랜덤 이동(기본 속도)
      for (let i = 0; i < ICON_COUNT; i++) {
        let icon = icons[i];
        let x = icon.x.get() + icon.vx;
        let y = icon.y.get() + icon.vy;
        // 벽에 닿으면 튕김
        if (x < 0) { x = 0; icon.vx *= -1; }
        if (x > sizes.areaW - sizes.img) { x = sizes.areaW - sizes.img; icon.vx *= -1; }
        if (y < 0) { y = 0; icon.vy *= -1; }
        if (y > sizes.areaH - sizes.img) { y = sizes.areaH - sizes.img; icon.vy *= -1; }
        icon.x.set(x);
        icon.y.set(y);
      }
      // 2. 서로 가까우면 살짝 회피(반발력)
      for (let i = 0; i < ICON_COUNT; i++) {
        for (let j = 0; j < ICON_COUNT; j++) {
          if (i === j) continue;
          const iconA = icons[i];
          const iconB = icons[j];
          const dx = (iconA.x.get() + sizes.img/2) - (iconB.x.get() + sizes.img/2);
          const dy = (iconA.y.get() + sizes.img/2) - (iconB.y.get() + sizes.img/2);
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < REPULSION_RADIUS && dist > 0) {
            const repel = (REPULSION_RADIUS - dist) / REPULSION_RADIUS * 0.7;
            iconA.x.set(iconA.x.get() + (dx / dist) * repel);
            iconA.y.set(iconA.y.get() + (dy / dist) * repel);
          }
        }
      }
      // 3. 커서/터치가 가까우면 해당 아이콘만 scale up + 살짝 도망
      for (let i = 0; i < ICON_COUNT; i++) {
        let icon = icons[i];
        let scale = 1;
        if (pointer) {
          const dx = pointer.x - (icon.x.get() + sizes.img/2);
          const dy = pointer.y - (icon.y.get() + sizes.img/2);
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < CURSOR_RADIUS) {
            scale = 1.18;
            icon.x.set(icon.x.get() - dx * 0.08);
            icon.y.set(icon.y.get() - dy * 0.08);
          }
        }
        icon.scale.set(scale);
      }
      raf = window.requestAnimationFrame(animateIcons);
    }
    raf = window.requestAnimationFrame(animateIcons);
    return () => window.cancelAnimationFrame(raf);
  }, [sizes.areaW, sizes.areaH, sizes.img]);

  // 영역 내 마우스/터치 위치 추적 + mousePos 상태 업데이트
  const handleAreaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    pointerRef.current = pos;
    setMousePos(pos);
  };
  const handleAreaTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const pos = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    pointerRef.current = pos;
    setMousePos(pos);
  };
  const handleAreaMouseLeave = () => {
    pointerRef.current = null;
    setMousePos(null);
  };

  return (
    <section
      id="skills"
      className="section-padding bg-gradient-to-b from-background to-primary/5 relative overflow-hidden scroll-mt-24 md:scroll-mt-32"
    >
      {/* 자연스러운 블러/그라데이션 원 배경 (about me 스타일) */}
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#e6f2fb] to-[#b7cbe6] opacity-60 blur-2xl z-0" />
      <div className="absolute -bottom-32 -left-32 w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-[#e6f2fb] to-[#b7cbe6] opacity-50 blur-2xl z-0" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2
          className={cn(
            "section-title text-[#2e4a7d] transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          My Capabilities
        </h2>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-24 transition-all duration-700 delay-300",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          {skills.map((skill, index) => (
            <Card
              key={skill.name}
              className="skill-item group transition-all duration-200 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 flex flex-col items-center justify-center relative z-10">
                <div className="mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                <p className="text-sm text-muted-foreground text-center">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2
          className={cn(
            "section-title text-[#2e4a7d] transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10",
          )}
        >
          Tools I Use
        </h2>

        <div
          ref={areaRef}
          style={{
            width: `min(100vw, ${sizes.areaW}px)`,
            height: `${sizes.areaH}px`,
            position: "relative",
            margin: "0 auto",
            background: "#f8fafc",
            borderRadius: 24,
            overflow: "hidden",
            cursor: "none",
            maxWidth: "100%",
            minWidth: 0,
            touchAction: "none",
          }}
          onMouseMove={handleAreaMouseMove}
          onMouseLeave={handleAreaMouseLeave}
          onTouchMove={handleAreaTouchMove}
          onTouchEnd={handleAreaMouseLeave}
        >
          {toolImages.map((tool, index) => {
            const icon = iconsRef.current[index];
            if (!icon || !icon.x || !icon.y || !icon.scale || !icon.rotation) return null;
            return (
              <ScatterToolImage
                key={index}
                src={tool.src}
                alt={tool.alt}
                x={icon.x}
                y={icon.y}
                scale={icon.scale}
                rotation={icon.rotation}
                imgSize={sizes.img}
              />
            );
          })}
        </div>
      </div>
    </section>
  )
}
