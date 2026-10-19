import React from 'react';
import { PixelCloud, PixelClover, PixelCoin, PixelHeart, PixelStar } from './PixelIcons';

export const PixelDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. 도트 매트릭스 배경 패턴 */}
      <div className="absolute inset-0 retro-dot-bg opacity-90" />
      <div className="absolute inset-0 pixel-grid-overlay" />

      {/* 2. 도트 구름 (상단 하늘 연출) */}
      <div className="absolute top-4 left-[8%] animate-pixel-float hidden sm:block opacity-75">
        <PixelCloud size={70} color="#99F6E4" />
      </div>
      <div className="absolute top-12 right-[12%] animate-pixel-float delay-150 hidden md:block opacity-65">
        <PixelCloud size={60} color="#A7F3D0" />
      </div>
      <div className="absolute top-28 left-[4%] animate-pixel-bounce delay-100 hidden lg:block opacity-50">
        <PixelCloud size={48} color="#CCFBF1" />
      </div>

      {/* 3. 좌상단 도트 오브젝트들 (네잎클로버 & 코인 & 별) */}
      <div className="absolute top-16 left-8 animate-pixel-bounce hidden sm:block">
        <PixelClover size={24} color="#10B981" />
      </div>
      <div className="absolute top-36 left-16 animate-pixel-float hidden md:block">
        <PixelCoin size={22} />
      </div>
      <div className="absolute top-56 left-6 animate-pixel-float delay-100 hidden lg:block">
        <PixelStar size={18} color="#2DD4BF" />
      </div>

      {/* 4. 우상단 도트 오브젝트들 (클로버 & 하트 & 별) */}
      <div className="absolute top-16 right-8 animate-pixel-float delay-75 hidden sm:block">
        <PixelClover size={26} color="#059669" />
      </div>
      <div className="absolute top-36 right-16 animate-pixel-bounce delay-150 hidden md:block">
        <PixelHeart size={20} color="#34D399" />
      </div>
      <div className="absolute top-56 right-10 animate-pixel-float hidden lg:block">
        <PixelStar size={20} color="#FDE047" />
      </div>

      {/* 5. 좌하단 도트 오브젝트들 */}
      <div className="absolute bottom-20 left-10 animate-pixel-bounce delay-75 hidden md:block">
        <PixelStar size={24} color="#5EEAD4" />
      </div>
      <div className="absolute bottom-40 left-20 animate-pixel-float hidden lg:block">
        <PixelClover size={22} color="#10B981" />
      </div>

      {/* 6. 우하단 도트 오브젝트들 */}
      <div className="absolute bottom-24 right-12 animate-pixel-float delay-150 hidden md:block">
        <PixelCoin size={24} />
      </div>
      <div className="absolute bottom-44 right-20 animate-pixel-bounce hidden lg:block">
        <PixelClover size={20} color="#059669" />
      </div>

      {/* 7. 모바일 전용 은은한 상단 도트 장식 */}
      <div className="absolute top-3 right-4 sm:hidden animate-pixel-float opacity-80">
        <PixelClover size={18} color="#10B981" />
      </div>
      <div className="absolute top-10 left-3 sm:hidden animate-pixel-bounce opacity-80">
        <PixelStar size={16} color="#2DD4BF" />
      </div>
    </div>
  );
};
