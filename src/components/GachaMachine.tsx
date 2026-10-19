import React, { useState, useEffect } from 'react';
import { PixelClover, PixelCoin, PixelStar, PixelCrankDial } from './PixelIcons';
import { PixelCapsule } from './PixelCapsule';
import { sound } from '../utils/audio';

interface GachaMachineProps {
  isDrawing: boolean;
  onDraw: () => void;
  disabled?: boolean;
  totalCount?: number;
}

type CapsuleColor = 'mint' | 'yellow' | 'pink' | 'blue' | 'purple' | 'orange' | 'red';

interface CapsuleState {
  id: number;
  color: CapsuleColor;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

export const GachaMachine: React.FC<GachaMachineProps> = ({
  isDrawing,
  onDraw,
  disabled = false,
  totalCount = 0,
}) => {
  // 회전 크랭크 레버 각도
  const [handleAngle, setHandleAngle] = useState(0);

  // 배출구로 굴러나온 캡슐 상태
  const [droppedCapsuleColor, setDroppedCapsuleColor] = useState<CapsuleColor | null>(null);

  // 챔버 내부의 정교한 8비트 캡슐통들
  const [capsules, setCapsules] = useState<CapsuleState[]>(() => [
    { id: 1, color: 'mint', x: 26, y: 72, size: 36, rotation: -15 },
    { id: 2, color: 'yellow', x: 50, y: 76, size: 36, rotation: 10 },
    { id: 3, color: 'blue', x: 74, y: 70, size: 36, rotation: 25 },
    { id: 4, color: 'pink', x: 38, y: 52, size: 36, rotation: -35 },
    { id: 5, color: 'purple', x: 62, y: 50, size: 36, rotation: 18 },
    { id: 6, color: 'orange', x: 50, y: 32, size: 36, rotation: -12 },
    { id: 7, color: 'red', x: 22, y: 40, size: 36, rotation: 40 },
    { id: 8, color: 'mint', x: 78, y: 44, size: 36, rotation: -25 },
    { id: 9, color: 'yellow', x: 32, y: 24, size: 34, rotation: 15 },
    { id: 10, color: 'blue', x: 68, y: 26, size: 34, rotation: -20 },
  ]);

  // 뽑기 진행 시 볼들이 마구 튀어 오르고 크랭크가 360도 연속 회전
  useEffect(() => {
    let ballInterval: NodeJS.Timeout | null = null;
    let handleInterval: NodeJS.Timeout | null = null;

    if (isDrawing) {
      setDroppedCapsuleColor(null);

      // 크랭크 핸들 고속 회전
      handleInterval = setInterval(() => {
        setHandleAngle((prev) => (prev + 36) % 360);
      }, 40);

      // 캡슐통 요동치는 물리 연출
      ballInterval = setInterval(() => {
        setCapsules((prev) =>
          prev.map((c) => ({
            ...c,
            x: Math.max(16, Math.min(84, c.x + (Math.random() * 32 - 16))),
            y: Math.max(20, Math.min(80, c.y + (Math.random() * 32 - 16))),
            rotation: (c.rotation + 30) % 360,
          }))
        );
      }, 65);
    } else {
      setHandleAngle(0);
      // 뽑기가 끝나면 랜덤 색상의 배출 캡슐 설정
      const colors: CapsuleColor[] = ['mint', 'yellow', 'pink', 'blue', 'purple', 'orange', 'red'];
      setDroppedCapsuleColor(colors[Math.floor(Math.random() * colors.length)]);

      // 기본 안정 위치로 원복
      setCapsules([
        { id: 1, color: 'mint', x: 26, y: 72, size: 36, rotation: -15 },
        { id: 2, color: 'yellow', x: 50, y: 76, size: 36, rotation: 10 },
        { id: 3, color: 'blue', x: 74, y: 70, size: 36, rotation: 25 },
        { id: 4, color: 'pink', x: 38, y: 52, size: 36, rotation: -35 },
        { id: 5, color: 'purple', x: 62, y: 50, size: 36, rotation: 18 },
        { id: 6, color: 'orange', x: 50, y: 32, size: 36, rotation: -12 },
        { id: 7, color: 'red', x: 22, y: 40, size: 36, rotation: 40 },
        { id: 8, color: 'mint', x: 78, y: 44, size: 36, rotation: -25 },
        { id: 9, color: 'yellow', x: 32, y: 24, size: 34, rotation: 15 },
        { id: 10, color: 'blue', x: 68, y: 26, size: 34, rotation: -20 },
      ]);
    }

    return () => {
      if (ballInterval) clearInterval(ballInterval);
      if (handleInterval) clearInterval(handleInterval);
    };
  }, [isDrawing]);

  const handleAction = () => {
    if (isDrawing || disabled) return;
    sound.playClick();
    onDraw();
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-[390px] sm:max-w-[430px] mx-auto">
      {/* 1. 기계 지붕: 100% 8-비트 픽셀 차양 어닝 (Pixel Awning) */}
      <div className="w-[94%] relative z-10 flex flex-col items-center">
        {/* 상단 픽셀 배너 */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#134E48] text-white border-3 border-[#134E48] rounded-t-xl shadow-[3px_0px_0px_#0A2926]">
          <PixelClover size={14} color="#34D399" />
          <span className="font-['Press_Start_2P'] text-[9px] sm:text-[10px] tracking-wider text-[#A7F3D0]">
            ★ 8-BIT GACHAPON ★
          </span>
          <PixelStar size={14} color="#FDE047" />
        </div>

        {/* 픽셀 스트라이프 차양 판 (Pixel Scallop Roof) */}
        <div className="w-full h-8 bg-[#2DD4BF] border-3 border-[#134E48] flex items-center justify-between px-1 shadow-[4px_4px_0px_#134E48]">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-8 h-full border-r-2 border-[#134E48] flex flex-col justify-between p-0.5 ${
                i % 2 === 0 ? 'bg-[#5EEAD4]' : 'bg-[#F0FDF9]'
              }`}
            >
              <div className="w-full h-1 bg-white/40" />
              <div className="w-1.5 h-1.5 bg-[#134E48] self-center" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. 기계 본체 (Pixel Cabinet Body) */}
      <div
        className={`w-full bg-[#A7F3D0] border-4 border-[#134E48] rounded-2xl p-4 sm:p-5 shadow-[8px_8px_0px_#134E48] relative transition-transform duration-100 ${
          isDrawing ? 'animate-pixel-shake' : ''
        }`}
      >
        {/* 상단 픽셀 전광판 (Pixel Marquee) */}
        <div className="bg-[#134E48] border-3 border-[#092B28] px-3 py-2 rounded-xl mb-3.5 shadow-inner flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#FDE047] border border-black animate-pixel-blink" />
            <span className="w-2.5 h-2.5 bg-[#34D399] border border-black animate-pixel-blink delay-75" />
            <span className="w-2.5 h-2.5 bg-[#38BDF8] border border-black animate-pixel-blink delay-150" />
          </div>
          <div className="font-['Press_Start_2P'] text-[10px] sm:text-[11px] text-[#A7F3D0] tracking-widest font-bold">
            MINT GACHA 50
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#F43F5E] border border-black animate-pixel-blink" />
            <span className="w-2.5 h-2.5 bg-[#FDE047] border border-black animate-pixel-blink delay-75" />
            <span className="w-2.5 h-2.5 bg-[#10B981] border border-black animate-pixel-blink delay-150" />
          </div>
        </div>

        {/* 3. 투명 유리 돔 챔버 (Crystal Capsule Chamber) */}
        <div className="relative w-full h-[220px] sm:h-[245px] bg-gradient-to-b from-[#E6FFFA] via-[#D1FAE5] to-[#A7F3D0] border-4 border-[#134E48] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
          {/* 픽셀 격자망 오버레이 */}
          <div className="absolute inset-0 pixel-grid-overlay opacity-30 pointer-events-none" />

          {/* 유리 돔 픽셀 하이라이트 (Pixel Glints) */}
          <div className="absolute top-2 left-3 w-16 h-8 bg-white/75 rounded-full blur-[1px] rotate-[-25deg] pointer-events-none" />
          <div className="absolute top-10 left-5 w-5 h-4 bg-white/60 rounded-full blur-[0.5px] rotate-[-25deg] pointer-events-none" />

          {/* 챔버 내부 중앙 기계식 회전축 교반봉 (Pixel Rotor Paddle) */}
          <div className="absolute w-5 h-full bg-[#134E48]/20 border-x-2 border-[#134E48]/35 flex flex-col items-center justify-around pointer-events-none">
            <div className="w-8 h-2.5 bg-[#134E48]/40 border border-[#134E48]" />
            <div className="w-8 h-2.5 bg-[#134E48]/40 border border-[#134E48]" />
            <div className="w-8 h-2.5 bg-[#134E48]/40 border border-[#134E48]" />
          </div>

          {/* 배경 워터마크 안내 */}
          <div className="absolute text-center opacity-20 pointer-events-none select-none">
            <span className="text-xl sm:text-2xl font-black font-['Press_Start_2P'] text-[#134E48] tracking-widest">
              LUCKY 50
            </span>
          </div>

          {/* 정교한 100% 8-비트 도트 캡슐통들 (Pixel Art Capsules Inside) */}
          {capsules.map((cap) => (
            <div
              key={cap.id}
              className="absolute transition-all duration-75 select-none"
              style={{
                left: `${cap.x}%`,
                top: `${cap.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <PixelCapsule
                color={cap.color}
                size={cap.size}
                rotation={cap.rotation}
                hasShine={true}
              />
            </div>
          ))}

          {/* 뽑기 진행 시 회전 이펙트 텍스트 */}
          {isDrawing && (
            <div className="absolute inset-0 bg-[#E6FFFA]/50 backdrop-blur-[0.5px] flex flex-col items-center justify-center pointer-events-none animate-in fade-in">
              <div className="bg-white border-3 border-[#134E48] px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_#134E48] flex items-center gap-1.5 animate-bounce">
                <PixelClover size={16} color="#059669" />
                <span className="text-xs sm:text-sm font-black text-[#0D9488]">
                  도트 캡슐 굴러가는 중...!
                </span>
                <PixelStar size={16} color="#F59E0B" />
              </div>
            </div>
          )}
        </div>

        {/* 4. 기계 하단 컨트롤 패널: 메카니컬 크랭크 다이얼 + 코인 슬롯 + 디지털 카운터 */}
        <div className="mt-3.5 bg-[#F0FDF9] border-3 border-[#134E48] rounded-xl p-3 shadow-[4px_4px_0px_#134E48]">
          <div className="grid grid-cols-12 gap-2.5 items-center">
            {/* 왼쪽: 픽셀 메탈 코인 슬롯 */}
            <div className="col-span-3 bg-[#CCFBF1] border-2 border-[#134E48] rounded-lg p-1.5 flex flex-col items-center justify-center text-center shadow-[1px_1px_0px_#134E48]">
              <div className="w-7 h-1.5 bg-[#134E48] rounded-full mb-1" />
              <div className="flex items-center gap-0.5">
                <PixelCoin size={14} />
                <span className="text-[9px] font-bold text-[#065F46] leading-none">FREE</span>
              </div>
            </div>

            {/* 중앙: 100% 8-비트 회전 크랭크 레버 (Interactive Pixel Crank Dial) */}
            <div className="col-span-5 flex flex-col items-center justify-center">
              <button
                onClick={handleAction}
                disabled={isDrawing || disabled}
                className="group relative cursor-pointer focus:outline-none transition-transform active:scale-95"
                title="레버를 클릭해 돌려보세요!"
                aria-label="뽑기 레버 돌리기"
              >
                <PixelCrankDial
                  size={66}
                  rotation={handleAngle}
                  className="filter drop-shadow-[2px_2px_0px_#0A2926]"
                />
              </button>
              <span className="text-[10px] font-bold text-[#0D9488] mt-1 font-mono tracking-tight">
                {isDrawing ? 'SPINNING!' : 'TURN LEVER'}
              </span>
            </div>

            {/* 오른쪽: 도트 매트릭스 LED 50개 확률 리셋 표시창 */}
            <div className="col-span-4 bg-[#134E48] border-2 border-[#092724] rounded-lg p-2 text-center shadow-inner flex flex-col justify-center">
              <span className="text-[8px] sm:text-[9px] font-bold text-[#5EEAD4] font-mono leading-none">
                POOL ODDS
              </span>
              <span className="text-xs sm:text-sm font-black font-mono text-[#34D399] tracking-wider mt-0.5 leading-tight">
                {isDrawing ? 'ROLLING' : 'RESET 50'}
              </span>
            </div>
          </div>

          {/* 5. 캡슐 배출구 트레이 & PUSH 플랩 도어 */}
          <div className="mt-3 pt-2.5 border-t-2 border-dashed border-[#134E48]/25 flex items-center justify-center">
            <div className="w-36 h-12 bg-[#134E48] border-3 border-[#092825] rounded-lg relative flex items-center justify-center overflow-hidden shadow-inner">
              {/* 투명 푸시 플랩 도어 */}
              <div className="w-28 h-5 bg-[#34D399]/30 border-2 border-[#34D399] rounded-xs flex items-center justify-center">
                <span className="text-[8px] font-bold text-white tracking-widest font-mono">
                  PUSH FLAP
                </span>
              </div>
              {/* 배출구로 굴러나온 8비트 캡슐통 */}
              {droppedCapsuleColor && !isDrawing && (
                <div className="absolute top-1 animate-in zoom-in-75 duration-150">
                  <PixelCapsule
                    color={droppedCapsuleColor}
                    size={28}
                    rotation={15}
                    hasShine={true}
                  />
                </div>
              )}
              {isDrawing && (
                <div className="absolute top-1 animate-pixel-bounce">
                  <PixelCapsule
                    color="mint"
                    size={28}
                    rotation={handleAngle}
                    hasShine={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. 대형 민트 '뽑기!' 버튼 (Big 8-Bit Arcade Push Button) */}
      <div className="w-full mt-5 flex flex-col items-center">
        <button
          onClick={handleAction}
          disabled={isDrawing || disabled}
          className="pixel-btn pixel-draw-btn w-full py-4 sm:py-4.5 px-6 rounded-2xl text-xl sm:text-2xl font-black cursor-pointer tracking-wider relative overflow-hidden"
          aria-label="행운의 티켓 뽑기"
        >
          <div className="flex items-center justify-center gap-2.5">
            <PixelClover size={22} color="#FEF08A" />
            <span>{isDrawing ? '뽑는 중...' : '뽑기!'}</span>
            <PixelStar size={22} color="#FEF08A" />
          </div>
          {/* 상단 픽셀 반짝임 하이라이트 */}
          <div className="absolute top-1 left-4 right-4 h-1.5 bg-white/35 rounded-full pointer-events-none" />
        </button>

        <p className="mt-2 text-xs text-[#0F766E] text-center font-bold">
          {isDrawing ? '어떤 행운이 나올까요?' : '버튼이나 레버를 눌러 50개의 티켓 중 1개를 뽑아보세요!'}
        </p>
      </div>
    </div>
  );
};
