export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
        <p>&copy; {new Date().getFullYear()} 김재원. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
