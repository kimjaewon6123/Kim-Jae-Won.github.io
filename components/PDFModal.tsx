"use client"

import { useState, useRef, useLayoutEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface PDFModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
}

export default function PDFModal({ isOpen, onClose, pdfUrl }: PDFModalProps) {
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        style={{ 
          width: '90vw', 
          height: '90vh', 
          maxWidth: '90vw', 
          maxHeight: '90vh', 
          minWidth: 320,
          minHeight: 200,
          padding: 24,
          zIndex: 9999,
          overflow: 'visible',
          background: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
        }}
      >
        <DialogTitle className="sr-only">PDF 문서 뷰어</DialogTitle>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10000,
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            fontSize: 24,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="닫기"
        >
          ×
        </button>
        <div className="w-full h-full flex flex-col" style={{height: '100%'}}>
          <div
            ref={containerRef}
            className="flex-1 flex flex-col items-center bg-white"
            style={{ minHeight: 0, height: '100%', width: '100%' }}
          >
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              style={{ border: 'none', width: '100%', height: '100%' }}
              title="PDF Viewer"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 