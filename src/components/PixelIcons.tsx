import React from 'react';

// 8-bit Pixel Star
export const PixelStar: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = '#FFE853',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    <rect x="7" y="1" width="2" height="2" fill={color} />
    <rect x="6" y="3" width="4" height="2" fill={color} />
    <rect x="1" y="5" width="14" height="2" fill={color} />
    <rect x="3" y="7" width="10" height="2" fill={color} />
    <rect x="5" y="9" width="6" height="2" fill={color} />
    <rect x="4" y="11" width="3" height="2" fill={color} />
    <rect x="9" y="11" width="3" height="2" fill={color} />
    <rect x="3" y="13" width="2" height="2" fill={color} />
    <rect x="11" y="13" width="2" height="2" fill={color} />
  </svg>
);

// 8-bit Pixel Heart
export const PixelHeart: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = '#FF6B8B',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    <rect x="3" y="2" width="4" height="2" fill={color} />
    <rect x="9" y="2" width="4" height="2" fill={color} />
    <rect x="2" y="4" width="6" height="2" fill={color} />
    <rect x="8" y="4" width="6" height="2" fill={color} />
    <rect x="2" y="6" width="12" height="2" fill={color} />
    <rect x="3" y="8" width="10" height="2" fill={color} />
    <rect x="4" y="10" width="8" height="2" fill={color} />
    <rect x="6" y="12" width="4" height="2" fill={color} />
    <rect x="7" y="14" width="2" height="1" fill={color} />
  </svg>
);

// 8-bit Pixel Clover (행운의 네잎클로버)
export const PixelClover: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = '#10B981',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    <rect x="3" y="1" width="3" height="3" fill={color} />
    <rect x="10" y="1" width="3" height="3" fill={color} />
    <rect x="2" y="3" width="5" height="3" fill={color} />
    <rect x="9" y="3" width="5" height="3" fill={color} />
    <rect x="1" y="8" width="4" height="4" fill={color} />
    <rect x="11" y="8" width="4" height="4" fill={color} />
    <rect x="3" y="10" width="4" height="3" fill={color} />
    <rect x="9" y="10" width="4" height="3" fill={color} />
    <rect x="5" y="5" width="6" height="6" fill="#34D399" />
    <rect x="7" y="11" width="2" height="4" fill="#047857" />
    <rect x="8" y="14" width="2" height="1" fill="#047857" />
  </svg>
);

// 8-bit Pixel Cloud
export const PixelCloud: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 32,
  color = '#CCFBF1',
  className = '',
}) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 20 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    <rect x="5" y="1" width="6" height="2" fill={color} />
    <rect x="3" y="3" width="12" height="2" fill={color} />
    <rect x="1" y="5" width="17" height="4" fill={color} />
    <rect x="2" y="9" width="15" height="2" fill={color} />
  </svg>
);

// 8-bit Coin
export const PixelCoin: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    <rect x="5" y="1" width="6" height="2" fill="#262438" />
    <rect x="5" y="13" width="6" height="2" fill="#262438" />
    <rect x="3" y="2" width="2" height="2" fill="#262438" />
    <rect x="11" y="2" width="2" height="2" fill="#262438" />
    <rect x="1" y="4" width="2" height="8" fill="#262438" />
    <rect x="13" y="4" width="2" height="8" fill="#262438" />
    <rect x="3" y="12" width="2" height="2" fill="#262438" />
    <rect x="11" y="12" width="2" height="2" fill="#262438" />
    {/* Body */}
    <rect x="3" y="4" width="10" height="8" fill="#FACC15" />
    <rect x="5" y="3" width="6" height="10" fill="#FACC15" />
    {/* Center Mark */}
    <rect x="7" y="5" width="2" height="6" fill="#CA8A04" />
    <rect x="6" y="6" width="4" height="2" fill="#CA8A04" />
  </svg>
);

// Item Specific 8-Bit Pixel Illustrations
export const ItemPixelIcon: React.FC<{ itemId: string; size?: number; className?: string }> = ({
  itemId,
  size = 48,
  className = '',
}) => {
  switch (itemId) {
    case 'free-pass': // 자유이용권 - 황금 왕관 & 럭키 티켓
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Crown */}
          <rect x="3" y="6" width="3" height="3" fill="#EAB308" />
          <rect x="10" y="4" width="4" height="3" fill="#FDE047" />
          <rect x="18" y="6" width="3" height="3" fill="#EAB308" />
          <rect x="4" y="9" width="16" height="2" fill="#CA8A04" />
          <rect x="5" y="11" width="14" height="4" fill="#FACC15" />
          <rect x="4" y="15" width="16" height="3" fill="#A16207" />
          {/* Jewels */}
          <rect x="6" y="12" width="2" height="2" fill="#EF4444" />
          <rect x="11" y="12" width="2" height="2" fill="#3B82F6" />
          <rect x="16" y="12" width="2" height="2" fill="#10B981" />
          {/* Sparkles */}
          <rect x="1" y="3" width="2" height="2" fill="#FFFBEB" />
          <rect x="21" y="3" width="2" height="2" fill="#FFFBEB" />
          <rect x="11" y="1" width="2" height="2" fill="#FFFBEB" />
        </svg>
      );

    case 'no-late': // 지각 면제권 - 날개 달린 알람시계
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Bells */}
          <rect x="4" y="3" width="4" height="3" fill="#EA580C" />
          <rect x="16" y="3" width="4" height="3" fill="#EA580C" />
          {/* Wings */}
          <rect x="1" y="8" width="3" height="4" fill="#93C5FD" />
          <rect x="20" y="8" width="3" height="4" fill="#93C5FD" />
          {/* Clock body */}
          <rect x="5" y="6" width="14" height="13" fill="#FFEDD5" />
          <rect x="7" y="5" width="10" height="15" fill="#FED7AA" />
          <rect x="6" y="7" width="12" height="11" fill="#FFFFFF" />
          {/* Hands */}
          <rect x="11" y="9" width="2" height="4" fill="#C2410C" />
          <rect x="11" y="12" width="4" height="2" fill="#C2410C" />
          {/* Feet */}
          <rect x="5" y="19" width="3" height="2" fill="#7C2D12" />
          <rect x="16" y="19" width="3" height="2" fill="#7C2D12" />
        </svg>
      );

    case 'no-cleaning': // 청소는 없다 - 마법 빗자루와 금지 서클
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Broom stick */}
          <rect x="18" y="3" width="3" height="3" fill="#B45309" />
          <rect x="15" y="6" width="3" height="3" fill="#D97706" />
          <rect x="12" y="9" width="3" height="3" fill="#D97706" />
          <rect x="9" y="12" width="3" height="3" fill="#D97706" />
          {/* Broom bristles */}
          <rect x="5" y="14" width="5" height="4" fill="#FDE047" />
          <rect x="3" y="17" width="7" height="4" fill="#EAB308" />
          {/* Sparkles / No mark */}
          <rect x="13" y="2" width="2" height="2" fill="#34D399" />
          <rect x="2" y="11" width="2" height="2" fill="#34D399" />
          <rect x="18" y="14" width="3" height="3" fill="#10B981" />
          <rect x="17" y="18" width="4" height="2" fill="#059669" />
        </svg>
      );

    case 'stand-behind': // 내 뒤로 서! - 깃발 & 당당한 줄서기
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Flagpole */}
          <rect x="4" y="3" width="2" height="18" fill="#475569" />
          {/* Flag */}
          <rect x="6" y="3" width="12" height="8" fill="#3B82F6" />
          <rect x="8" y="5" width="8" height="4" fill="#60A5FA" />
          {/* Star on flag */}
          <rect x="11" y="6" width="2" height="2" fill="#FACC15" />
          {/* Marching leader footsteps */}
          <rect x="14" y="14" width="3" height="2" fill="#2563EB" />
          <rect x="18" y="17" width="3" height="2" fill="#1D4ED8" />
        </svg>
      );

    case 'seat-swap': // 1일 자리 바꾸기 - 책상 & 의자 체인지 화살표
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Desk */}
          <rect x="4" y="8" width="16" height="3" fill="#A855F7" />
          <rect x="5" y="11" width="2" height="8" fill="#7E22CE" />
          <rect x="17" y="11" width="2" height="8" fill="#7E22CE" />
          {/* Swap arrows */}
          <rect x="9" y="3" width="6" height="2" fill="#C084FC" />
          <rect x="14" y="4" width="2" height="2" fill="#C084FC" />
          <rect x="9" y="19" width="6" height="2" fill="#8B5CF6" />
          <rect x="8" y="18" width="2" height="2" fill="#8B5CF6" />
        </svg>
      );

    case 'sweet-3': // 달콤한 세입 - 트리플 롤리팝
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ imageRendering: 'pixelated' }}
        >
          {/* 3 Lollipops */}
          <rect x="4" y="4" width="5" height="5" fill="#F43F5E" />
          <rect x="5" y="5" width="3" height="3" fill="#FFE4E6" />
          <rect x="6" y="9" width="2" height="8" fill="#E2E8F0" />

          <rect x="10" y="2" width="6" height="6" fill="#F59E0B" />
          <rect x="11" y="3" width="4" height="4" fill="#FEF3C7" />
          <rect x="12" y="8" width="2" height="11" fill="#E2E8F0" />

          <rect x="16" y="5" width="5" height="5" fill="#10B981" />
          <rect x="17" y="6" width="3" height="3" fill="#D1FAE5" />
          <rect x="18" y="10" width="2" height="7" fill="#E2E8F0" />
        </svg>
      );

    case 'sweet-2': // 달콤한 두입 - 더블 사탕
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Candy 1 */}
          <rect x="4" y="5" width="2" height="2" fill="#F59E0B" />
          <rect x="6" y="4" width="6" height="6" fill="#FBBF24" />
          <rect x="7" y="5" width="4" height="4" fill="#FEF3C7" />
          <rect x="12" y="7" width="2" height="2" fill="#F59E0B" />

          {/* Candy 2 */}
          <rect x="11" y="14" width="2" height="2" fill="#EC4899" />
          <rect x="13" y="13" width="6" height="6" fill="#F472B6" />
          <rect x="14" y="14" width="4" height="4" fill="#FDF2F8" />
          <rect x="19" y="15" width="2" height="2" fill="#EC4899" />
        </svg>
      );

    case 'sweet-1': // 달콤한 한입 - 미니 캔디
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Wrapper Left */}
          <rect x="3" y="11" width="3" height="2" fill="#FB7185" />
          <rect x="4" y="9" width="2" height="6" fill="#F43F5E" />
          {/* Sweet Core */}
          <rect x="7" y="8" width="10" height="8" fill="#FF809F" />
          <rect x="8" y="9" width="8" height="6" fill="#FFF0F5" />
          <rect x="10" y="10" width="4" height="4" fill="#FF4D79" />
          {/* Wrapper Right */}
          <rect x="18" y="11" width="3" height="2" fill="#FB7185" />
          <rect x="18" y="9" width="2" height="6" fill="#F43F5E" />
        </svg>
      );

    case 'boom': // 꽝 - 아쉬운 먹구름 & 땀방울
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Cloud */}
          <rect x="7" y="5" width="10" height="4" fill="#94A3B8" />
          <rect x="4" y="8" width="16" height="6" fill="#64748B" />
          <rect x="3" y="10" width="18" height="4" fill="#475569" />
          {/* Sad Eyes */}
          <rect x="7" y="11" width="2" height="2" fill="#0F172A" />
          <rect x="15" y="11" width="2" height="2" fill="#0F172A" />
          {/* Sad Mouth */}
          <rect x="11" y="13" width="2" height="1" fill="#0F172A" />
          {/* Rain / Tear drops */}
          <rect x="6" y="16" width="2" height="3" fill="#60A5FA" />
          <rect x="12" y="17" width="2" height="3" fill="#60A5FA" />
          <rect x="17" y="16" width="2" height="3" fill="#60A5FA" />
        </svg>
      );

    default:
      return <PixelStar size={size} />;
  }
};

// 8-bit Pixel Rotary Crank Dial (아케이드 뽑기 회전 손잡이)
export const PixelCrankDial: React.FC<{ size?: number; rotation?: number; className?: string }> = ({
  size = 64,
  rotation = 0,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{
      imageRendering: 'pixelated',
      transform: `rotate(${rotation}deg)`,
      transformOrigin: 'center center',
    }}
  >
    {/* 바깥 원형 계단 외곽선 */}
    <rect x="11" y="1" width="10" height="2" fill="#134E48" />
    <rect x="7" y="3" width="4" height="2" fill="#134E48" />
    <rect x="21" y="3" width="4" height="2" fill="#134E48" />
    <rect x="4" y="5" width="3" height="2" fill="#134E48" />
    <rect x="25" y="5" width="3" height="2" fill="#134E48" />
    <rect x="2" y="7" width="2" height="4" fill="#134E48" />
    <rect x="28" y="7" width="2" height="4" fill="#134E48" />
    <rect x="1" y="11" width="2" height="10" fill="#134E48" />
    <rect x="29" y="11" width="2" height="10" fill="#134E48" />
    <rect x="2" y="21" width="2" height="4" fill="#134E48" />
    <rect x="28" y="21" width="2" height="4" fill="#134E48" />
    <rect x="4" y="25" width="3" height="2" fill="#134E48" />
    <rect x="25" y="25" width="3" height="2" fill="#134E48" />
    <rect x="7" y="27" width="4" height="2" fill="#134E48" />
    <rect x="21" y="27" width="4" height="2" fill="#134E48" />
    <rect x="11" y="29" width="10" height="2" fill="#134E48" />

    {/* 베젤 링 (골드 & 실버 메탈) */}
    <rect x="11" y="3" width="10" height="2" fill="#FDE047" />
    <rect x="7" y="5" width="18" height="2" fill="#FDE047" />
    <rect x="5" y="7" width="22" height="18" fill="#FACC15" />
    <rect x="7" y="25" width="18" height="2" fill="#CA8A04" />
    <rect x="11" y="27" width="10" height="2" fill="#A16207" />

    {/* 내부 기어 링 */}
    <rect x="9" y="9" width="14" height="14" fill="#E2E8F0" />
    <rect x="8" y="11" width="16" height="10" fill="#E2E8F0" />
    <rect x="11" y="8" width="10" height="16" fill="#E2E8F0" />

    {/* 회전 크랭크 바 (가로 직사각형 손잡이) */}
    <rect x="4" y="13" width="24" height="6" fill="#134E48" />
    <rect x="5" y="14" width="22" height="4" fill="#0D9488" />
    <rect x="6" y="14" width="20" height="2" fill="#2DD4BF" />
    {/* 크랭크 양 끝 픽셀 볼트 */}
    <rect x="6" y="15" width="2" height="2" fill="#FFFFFF" />
    <rect x="24" y="15" width="2" height="2" fill="#FFFFFF" />

    {/* 센터 원형 클로버 볼트 */}
    <rect x="12" y="12" width="8" height="8" fill="#134E48" />
    <rect x="13" y="13" width="6" height="6" fill="#10B981" />
    <rect x="14" y="14" width="4" height="4" fill="#34D399" />
    <rect x="15" y="15" width="2" height="2" fill="#FFFFFF" />
  </svg>
);

