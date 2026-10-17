import React from 'react';
import { PixelHeart, PixelStar } from './PixelIcons';

export const PixelDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 좌상단 별 & 하트 */}
      <div className="absolute top-6 left-6 animate-pixel-float hidden sm:block">
        <PixelStar size={24} color="#FDE047" />
      </div>
      <div className="absolute top-24 left-16 animate-pixel-bounce hidden md:block">
        <PixelHeart size={20} color="#FFCCD9" />
      </div>
      <div className="absolute top-44 left-8 animate-pixel-float delay-100 hidden lg:block">
        <PixelStar size={16} color="#BAF2DF" />
      </div>

      {/* 우상단 별 & 하트 */}
      <div className="absolute top-8 right-8 animate-pixel-float delay-75 hidden sm:block">
        <PixelHeart size={26} color="#FF8DA1" />
      </div>
      <div className="absolute top-28 right-16 animate-pixel-bounce delay-150 hidden md:block">
        <PixelStar size={22} color="#FEF08A" />
      </div>
      <div className="absolute top-52 right-10 animate-pixel-float hidden lg:block">
        <PixelStar size={18} color="#93C5FD" />
      </div>

      {/* 좌하단 */}
      <div className="absolute bottom-16 left-10 animate-pixel-bounce delay-75 hidden md:block">
        <PixelStar size={22} color="#FDE047" />
      </div>
      <div className="absolute bottom-32 left-20 animate-pixel-float hidden lg:block">
        <PixelHeart size={18} color="#FFCCD9" />
      </div>

      {/* 우하단 */}
      <div className="absolute bottom-20 right-12 animate-pixel-float delay-150 hidden md:block">
        <PixelHeart size={22} color="#FF8DA1" />
      </div>
      <div className="absolute bottom-36 right-24 animate-pixel-bounce hidden lg:block">
        <PixelStar size={16} color="#BAF2DF" />
      </div>

      {/* 모바일용 은은한 장식 2개 */}
      <div className="absolute top-4 right-4 sm:hidden animate-pixel-float opacity-70">
        <PixelStar size={16} color="#FDE047" />
      </div>
      <div className="absolute top-12 left-3 sm:hidden animate-pixel-bounce opacity-70">
        <PixelHeart size={16} color="#FF8DA1" />
      </div>
    </div>
  );
};
