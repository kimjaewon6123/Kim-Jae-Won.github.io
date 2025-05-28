"use client"

import { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

interface PDFModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
}

export default function PDFModal({ isOpen, onClose, pdfUrl }: PDFModalProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [isWorkerLoaded, setIsWorkerLoaded] = useState(false)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const pdfOptions = useMemo(() => ({
    cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
  }), [])

  useEffect(() => {
    const loadWorker = async () => {
      try {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
        setIsWorkerLoaded(true)
      } catch (err) {
        console.error('PDF 워커 로드 실패:', err)
        setError('PDF 뷰어를 초기화하는 중 오류가 발생했습니다.')
      }
    }
    loadWorker()
  }, [])

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

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setError(null)
  }

  function onDocumentLoadError(error: Error) {
    setError("PDF를 불러오는 중 오류가 발생했습니다.")
    console.error("PDF 로드 에러:", error)
  }

  if (!isWorkerLoaded) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl h-[90vh] overflow-hidden">
          <DialogTitle className="sr-only">PDF 문서 뷰어</DialogTitle>
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <DialogTitle className="sr-only">PDF 문서 뷰어</DialogTitle>
        <div className="w-full h-full flex flex-col">
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto max-h-[80vh] flex flex-col items-center bg-white"
            style={{ minHeight: 0 }}
          >
            {error ? (
              <div className="flex items-center justify-center h-full text-red-500">
                {error}
              </div>
            ) : (
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                className="flex flex-col items-center w-full"
                loading={
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                }
                options={pdfOptions}
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <div key={`page_${index + 1}`} className="mb-4 w-full flex justify-center">
                    <Page
                      pageNumber={index + 1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={containerWidth > 0 ? Math.min(containerWidth, 900) : 900}
                    />
                  </div>
                ))}
              </Document>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 