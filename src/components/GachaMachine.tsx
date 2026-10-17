import React, { useState, useEffect } from 'react';
import { PixelCoin, PixelHeart, PixelStar } from './PixelIcons';
import { sound } from '../utils/audio';

interface GachaMachineProps {
  isDrawing: boolean;
  onDraw: () => void;
  disabled?: boolean;
}

interface CapsuleBall {
  id: number;
  color: string;
  x: number;
  y: number;
  size: number;
}

const BALL_COLORS = ['#FF8DA1', '#FDE047', '#6EE7B7', '#93C5FD', '#C084FC', '#FDBA74'];

export const GachaMachine: React.FC<GachaMachineProps> = ({ isDrawing, onDraw, disabled = false }) => {
  // 캡슐 볼들의 위치 상태 (회전 시 튕기는 효과)
  const [balls, setBalls] = useState<CapsuleBall[]>(() => [
    { id: 1, color: '#FF8DA1', x: 22, y: 65, size: 28 },
    { id: 2, color: '#FDE047', x: 50, y: 70, size: 26 },
    { id: 3, color: '#6EE7B7', x: 74, y: 62, size: 28 },
    { id: 4, color: '#93C5FD', x: 35, y: 45, size: 26 },
    { id: 5, color: '#C084FC', x: 62, y: 42, size: 27 },
    { id: 6, color: '#FDBA74', x: 48, y: 25, size: 25 },
    { id: 7, color: '#FF8DA1', x: 20, y: 35, size: 24 },
    { id: 8, color: '#FDE047', x: 78, y: 38, size: 25 },
  ]);

  // 뽑기 진행 시 볼들이 마구 튀어 오르는 효과
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isDrawing) {
      interval = setInterval(() => {
        setBalls((prev) =>
          prev.map((ball) => ({
            ...ball,
            x: Math.max(15, Math.min(80, ball.x + (Math.random() * 30 - 15))),
            y: Math.max(20, Math.min(75, ball.y + (Math.random() * 30 - 15))),
            color: BALL_COLORS[Math.floor(Math.random() * BALL_COLORS.length)],
          }))
        );
      }, 90);
    } else {
      // 기본 위치로 복귀
      setBalls([
        { id: 1, color: '#FF8DA1', x: 22, y: 65, size: 28 },
        { id: 2, color: '#FDE047', x: 50, y: 70, size: 26 },
        { id: 3, color: '#6EE7B7', x: 74, y: 62, size: 28 },
        { id: 4, color: '#93C5FD', x: 35, y: 45, size: 26 },
        { id: 5, color: '#C084FC', x: 62, y: 42, size: 27 },
        { id: 6, color: '#FDBA74', x: 48, y: 25, size: 25 },
        { id: 7, color: '#FF8DA1', x: 20, y: 35, size: 24 },
        { id: 8, color: '#FDE047', x: 78, y: 38, size: 25 },
      ]);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDrawing]);

  const handleDrawClick = () => {
    if (isDrawing || disabled) return;
    sound.playClick();
    onDraw();
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-[340px] sm:max-w-[380px] mx-auto">
      {/* 뽑기 기계 바디 */}
      <div
        className={`w-full bg-[#FFE5EC] border-4 border-[#262438] rounded-2xl p-4 shadow-[6px_6px_0px_#262438] relative transition-transform duration-100 ${
          isDrawing ? 'animate-pixel-shake' : ''
        }`}
      >
        {/* 기계 상단 루프 / 장식 네온바 */}
        <div className="flex items-center justify-between bg-[#FFFDF7] border-2 border-[#262438] px-3 py-1.5 rounded-lg mb-3 shadow-[2px_2px_0px_#262438]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#FF6B8B] border border-[#262438] animate-pixel-blink" />
            <span className="w-2.5 h-2.5 rounded-sm bg-[#FACC15] border border-[#262438] animate-pixel-blink delay-75" />
            <span className="w-2.5 h-2.5 rounded-sm bg-[#34D399] border border-[#262438] animate-pixel-blink delay-150" />
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#832A44] tracking-wider">
            <PixelStar size={14} color="#F59E0B" />
            <span>LUCKY GACHA</span>
            <PixelHeart size={12} color="#FF6B8B" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#38BDF8] border border-[#262438] animate-pixel-blink" />
            <span className="w-2.5 h-2.5 rounded-sm bg-[#C084FC] border border-[#262438] animate-pixel-blink delay-75" />
          </div>
        </div>

        {/* 투명 캡슐 돔 챔버 */}
        <div className="relative w-full h-[180px] sm:h-[200px] bg-gradient-to-b from-[#F0FDFA] to-[#E0F2FE] border-4 border-[#262438] rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
          {/* 유리 빛 반사 하이라이트 */}
          <div className="absolute top-2 left-3 w-12 h-6 bg-white/70 rounded-full blur-[1px] rotate-[-20deg] pointer-events-none" />
          <div className="absolute top-8 left-4 w-4 h-3 bg-white/60 rounded-full blur-[0.5px] rotate-[-20deg] pointer-events-none" />

          {/* 챔버 내부 중앙 레트로 안내 마크 */}
          <div className="absolute text-center opacity-25 pointer-events-none">
            <span className="text-2xl font-bold tracking-widest text-[#262438]">★ 50 TICKETS ★</span>
          </div>

          {/* 캡슐 볼들 */}
          {balls.map((ball) => (
            <div
              key={ball.id}
              className="absolute rounded-full border-2 border-[#262438] shadow-[1px_2px_0px_rgba(0,0,0,0.25)] transition-all duration-75 flex items-center justify-center overflow-hidden"
              style={{
                left: `${ball.x}%`,
                top: `${ball.y}%`,
                width: `${ball.size}px`,
                height: `${ball.size}px`,
                backgroundColor: ball.color,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* 반쪽 뚜껑 효과 */}
              <div className="w-full h-1/2 bg-white/40 absolute top-0 left-0 border-b border-[#262438]/40" />
              <div className="w-1.5 h-1.5 bg-white/80 rounded-full absolute top-1 left-1.5" />
            </div>
          ))}

          {/* 뽑는 중 소용돌이 이펙트 */}
          {isDrawing && (
            <div className="absolute inset-0 bg-[#FFF5F7]/30 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-sm font-bold text-[#832A44] bg-[#FFFDF7] px-2.5 py-1 border-2 border-[#262438] shadow-[2px_2px_0px_#262438] animate-bounce">
                두근두근 굴러가는 중...!
              </span>
            </div>
          )}
        </div>

        {/* 기계 하단 컨트롤 패널 & 코인 슬롯 & 레버 */}
        <div className="mt-3 bg-[#FFFDF7] border-3 border-[#262438] rounded-xl p-3 shadow-[3px_3px_0px_#262438]">
          <div className="flex items-center justify-between gap-2">
            {/* 코인 투입구 장식 */}
            <div className="flex items-center gap-1.5 bg-[#FFF0F4] border-2 border-[#262438] px-2.5 py-1 rounded-md">
              <PixelCoin size={18} />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-500 font-bold leading-none">COST</span>
                <span className="text-xs font-bold text-[#FF5A8D] leading-none">FREE!</span>
              </div>
            </div>

            {/* 상태 디스플레이 창 */}
            <div className="flex-1 bg-[#262438] border-2 border-[#191826] px-2.5 py-1.5 rounded-md text-center">
              <span
                className={`text-[11px] font-mono tracking-wider font-bold ${
                  isDrawing ? 'text-[#FDE047] animate-pulse' : 'text-[#34D399]'
                }`}
              >
                {isDrawing ? 'ROLLING...' : 'READY!'}
              </span>
            </div>

            {/* 픽셀 장식 하트 */}
            <div className="p-1.5 bg-[#FEF3C7] border-2 border-[#262438] rounded-md flex items-center justify-center">
              <PixelHeart size={16} color="#FF5A8D" />
            </div>
          </div>

          {/* 배출구 (캡슐이 쏙 나오는 곳) */}
          <div className="mt-2.5 pt-2 border-t-2 border-dashed border-[#262438]/20 flex items-center justify-center">
            <div className="w-24 h-9 bg-[#262438] border-2 border-[#191826] rounded-md relative flex items-center justify-center overflow-hidden">
              <div className="w-20 h-2 bg-[#12111D] rounded-full mx-auto" />
              {isDrawing && (
                <div className="absolute w-6 h-6 rounded-full bg-[#FF8DA1] border border-white animate-pixel-bounce top-1" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 대망의 메인 '뽑기!' 버튼 */}
      <div className="w-full mt-4 flex flex-col items-center">
        <button
          onClick={handleDrawClick}
          disabled={isDrawing || disabled}
          className="pixel-btn pixel-draw-btn w-full py-3.5 sm:py-4 px-6 rounded-xl text-lg sm:text-xl font-black cursor-pointer tracking-wider relative overflow-hidden"
          aria-label="행운의 티켓 뽑기"
        >
          <div className="flex items-center justify-center gap-2">
            <PixelStar size={20} color="#FEF08A" />
            <span>{isDrawing ? '뽑는 중...' : '뽑기!'}</span>
            <PixelStar size={20} color="#FEF08A" />
          </div>
          {/* 반짝임 하이라이트 */}
          <div className="absolute top-1 left-3 right-3 h-1.5 bg-white/30 rounded-full pointer-events-none" />
        </button>

        <p className="mt-2 text-xs text-slate-500 text-center font-medium">
          {isDrawing ? '어떤 행운이 나올까요?' : '버튼을 눌러 50개의 티켓 중 1개를 뽑아보세요!'}
        </p>
      </div>
    </div>
  );
};
