import React from 'react';

export interface PixelCapsuleProps {
  color: 'mint' | 'yellow' | 'pink' | 'blue' | 'purple' | 'orange' | 'red';
  size?: number;
  rotation?: number;
  className?: string;
  hasShine?: boolean;
}

const COLOR_MAP = {
  mint: {
    base: '#10B981',
    highlight: '#34D399',
    shadow: '#065F46',
  },
  yellow: {
    base: '#F59E0B',
    highlight: '#FDE047',
    shadow: '#B45309',
  },
  pink: {
    base: '#EC4899',
    highlight: '#F472B6',
    shadow: '#9D174D',
  },
  blue: {
    base: '#0284C7',
    highlight: '#38BDF8',
    shadow: '#0369A1',
  },
  purple: {
    base: '#8B5CF6',
    highlight: '#A78BFA',
    shadow: '#6D28D9',
  },
  orange: {
    base: '#F97316',
    highlight: '#FB923C',
    shadow: '#C2410C',
  },
  red: {
    base: '#EF4444',
    highlight: '#F87171',
    shadow: '#B91C1C',
  },
};

/**
 * 100% 순수 8비트 픽셀 그리드로 렌더링되는 뽑기 캡슐통
 * 24x24 도트 매트릭스 규격 (Stepped Pixel Edges + Transparent Dome + Miniature Folded Ticket Inside)
 */
export const PixelCapsule: React.FC<PixelCapsuleProps> = ({
  color,
  size = 36,
  rotation = 0,
  className = '',
  hasShine = true,
}) => {
  const c = COLOR_MAP[color] || COLOR_MAP.mint;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      style={{
        imageRendering: 'pixelated',
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center',
      }}
    >
      {/* 1. 외곽선 (Pixel Dark Ink Contour) */}
      {/* 상단 돔 외곽 계단 */}
      <rect x="8" y="1" width="8" height="1" fill="#134E48" />
      <rect x="5" y="2" width="3" height="1" fill="#134E48" />
      <rect x="16" y="2" width="3" height="1" fill="#134E48" />
      <rect x="3" y="3" width="2" height="2" fill="#134E48" />
      <rect x="19" y="3" width="2" height="2" fill="#134E48" />
      <rect x="2" y="5" width="1" height="6" fill="#134E48" />
      <rect x="21" y="5" width="1" height="6" fill="#134E48" />

      {/* 중앙 걸쇠 / 이음매 외곽 (Capsule Seam) */}
      <rect x="1" y="11" width="2" height="2" fill="#134E48" />
      <rect x="21" y="11" width="2" height="2" fill="#134E48" />
      <rect x="1" y="11" width="22" height="1" fill="#134E48" />

      {/* 하단 컵 외곽 계단 */}
      <rect x="2" y="13" width="1" height="6" fill="#134E48" />
      <rect x="21" y="13" width="1" height="6" fill="#134E48" />
      <rect x="3" y="19" width="2" height="2" fill="#134E48" />
      <rect x="19" y="19" width="2" height="2" fill="#134E48" />
      <rect x="5" y="21" width="3" height="1" fill="#134E48" />
      <rect x="16" y="21" width="3" height="1" fill="#134E48" />
      <rect x="8" y="22" width="8" height="1" fill="#134E48" />

      {/* 2. 상단 투명 크리스탈 돔 내부 (Transparent Dome Interior) */}
      {/* 돔 바탕색 (은은한 클리어 민트/스카이) */}
      <rect x="8" y="2" width="8" height="1" fill="#CCFBF1" fillOpacity="0.85" />
      <rect x="5" y="3" width="14" height="2" fill="#E6FFFA" fillOpacity="0.85" />
      <rect x="3" y="5" width="18" height="6" fill="#E6FFFA" fillOpacity="0.85" />

      {/* 돔 유리 반사 도트 하이라이트 */}
      {hasShine && (
        <>
          <rect x="5" y="3" width="4" height="1" fill="#FFFFFF" />
          <rect x="4" y="4" width="2" height="2" fill="#FFFFFF" />
          <rect x="3" y="6" width="2" height="3" fill="#FFFFFF" />
        </>
      )}

      {/* 3. 캡슐 안의 귀여운 미니어처 픽셀 행운 티켓 (Mini Pixel Ticket Inside) */}
      <g>
        {/* 접힌 티켓 종이 */}
        <rect x="9" y="6" width="6" height="4" fill="#FEF08A" />
        <rect x="10" y="7" width="4" height="2" fill="#FDE047" />
        {/* 티켓 픽셀 텍스트 선 */}
        <rect x="11" y="7" width="2" height="1" fill="#B45309" />
        <rect x="10" y="9" width="4" height="1" fill="#CA8A04" />
        {/* 붉은 행운 별 포인트 */}
        <rect x="13" y="6" width="2" height="2" fill="#EF4444" />
      </g>

      {/* 4. 중앙 이음매 걸쇠 (Middle Joint Band) */}
      <rect x="2" y="11" width="20" height="2" fill="#FFFFFF" />
      <rect x="10" y="11" width="4" height="2" fill="#99F6E4" />
      <rect x="11" y="11" width="2" height="2" fill="#0D9488" />
      <rect x="2" y="12" width="20" height="1" fill="#134E48" fillOpacity="0.3" />

      {/* 5. 하단 솔리드 컬러 컵 (Colored Bottom Half) */}
      {/* 기본 바탕색 */}
      <rect x="3" y="13" width="18" height="6" fill={c.base} />
      <rect x="5" y="19" width="14" height="2" fill={c.base} />
      <rect x="8" y="21" width="8" height="1" fill={c.base} />

      {/* 하단 컵 좌측 하이라이트 도트 */}
      <rect x="3" y="13" width="2" height="5" fill={c.highlight} />
      <rect x="5" y="18" width="3" height="2" fill={c.highlight} />
      <rect x="8" y="20" width="3" height="1" fill={c.highlight} />

      {/* 하단 컵 우측/하단 그림자 도트 */}
      <rect x="18" y="14" width="3" height="5" fill={c.shadow} />
      <rect x="15" y="19" width="4" height="2" fill={c.shadow} />
      <rect x="12" y="21" width="4" height="1" fill={c.shadow} />
    </svg>
  );
};
