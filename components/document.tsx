import React, { useRef } from 'react';

const Document = () => {
  const carouselRef = useRef(null);

  return (
    <section id="document" className="section-padding section-bg-gray relative overflow-hidden scroll-mt-24 md:scroll-mt-32">
      <div className="container mx-auto content-padding text-center">
        <h2 className="section-title animate-scroll-in">Document</h2>

        {/* 문서 슬라이더 */}
        {/* ... existing code ... */}

      </div>
      {/* 섹션 구분선 */}
      <div className="section-divider-diagonal"></div>
    </section>
  );
};

export default Document; 