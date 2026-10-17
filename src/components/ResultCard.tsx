import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { DrawRecord } from '../types/draw';
import { getItemConfig } from '../utils/lottery';
import { ItemPixelIcon, PixelHeart, PixelStar } from './PixelIcons';
import { sound } from '../utils/audio';

interface ResultCardProps {
  record: DrawRecord;
  onClose: () => void;
  onDrawAgain: () => void;
  isDrawing: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ record, onClose, onDrawAgain, isDrawing }) => {
  const config = getItemConfig(record.itemId);

  // 결과 카드 마운트 시 티어에 따른 파티클 & 사운드 발동
  useEffect(() => {
    sound.playResultSound(record.tier);

    if (record.tier === 'legendary') {
      // 황금 잭팟 폭죽
      const end = Date.now() + 1500;
      const colors = ['#FBBF24', '#F59E0B', '#F43F5E', '#EC4899', '#38BDF8'];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
          shapes: ['square'],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
          shapes: ['square'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } else if (record.tier === 'epic' || record.tier === 'rare') {
      // 상큼한 파스텔 폭죽
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF8DA1', '#FDE047', '#6EE7B7', '#93C5FD'],
        shapes: ['square'],
      });
    }
  }, [record]);

  const getTierBadge = () => {
    switch (record.tier) {
      case 'legendary':
        return {
          label: '★ SSR LEGENDARY ★',
          bg: 'bg-[#FEF08A] text-[#854D0E] border-[#CA8A04]',
        };
      case 'epic':
        return {
          label: '★ SR EPIC PASS ★',
          bg: 'bg-[#E0E7FF] text-[#3730A3] border-[#6366F1]',
        };
      case 'rare':
        return {
          label: '★ R SWEET BONUS ★',
          bg: 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]',
        };
      case 'dud':
        return {
          label: '★ SPECIAL DUD ★',
          bg: 'bg-[#F1F5F9] text-[#475569] border-[#94A3B8]',
        };
      default:
        return {
          label: '★ NORMAL CHANCE ★',
          bg: 'bg-[#FCE7F3] text-[#9D174D] border-[#F472B6]',
        };
    }
  };

  const badge = getTierBadge();
  const isDud = record.tier === 'dud';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="result-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      {/* 바깥 픽셀 카드 컨테이너 */}
      <div
        className="relative w-full max-w-[420px] bg-[#FFFDF7] border-4 border-[#262438] rounded-2xl p-5 sm:p-6 shadow-[8px_8px_0px_#262438] transform animate-in zoom-in-95 duration-200"
        style={{ backgroundColor: config.bgColor }}
      >
        {/* 상단 닫기 X 버튼 */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute -top-3.5 -right-3.5 w-9 h-9 bg-[#FFFDF7] border-3 border-[#262438] rounded-full flex items-center justify-center font-black text-sm text-[#262438] shadow-[2px_2px_0px_#262438] hover:bg-[#FFE4E6] cursor-pointer"
          aria-label="닫기"
        >
          ✕
        </button>

        {/* 티어 헤더 배지 */}
        <div className="flex items-center justify-center mb-3">
          <div
            className={`px-3 py-1 border-2 rounded-md font-bold text-xs tracking-wider shadow-[2px_2px_0px_#262438] ${badge.bg}`}
          >
            {badge.label}
          </div>
        </div>

        {/* 메인 아이콘 디스플레이 영역 */}
        <div className="relative mx-auto my-3 w-28 h-28 sm:w-32 sm:h-32 bg-white/80 border-3 border-[#262438] rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_#262438] overflow-hidden">
          {/* 뒤 배경 반짝임 또는 비 */}
          {isDud ? (
            <div className="absolute inset-0 flex flex-col items-center justify-start pt-2 opacity-30 pointer-events-none">
              <span className="text-xs text-blue-500 font-mono">🌧️ 💧 💧</span>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <PixelStar size={80} color="#F59E0B" />
            </div>
          )}

          <div className={isDud ? 'animate-pixel-shake' : 'animate-pixel-bounce'}>
            <ItemPixelIcon itemId={record.itemId} size={64} />
          </div>
        </div>

        {/* 당첨 제목 */}
        <div className="text-center mt-2">
          <p className="text-[11px] font-bold text-slate-500 tracking-wider">
            #{record.drawNumber}번째 행운의 결과
          </p>
          <h2
            id="result-title"
            className="text-2xl sm:text-3xl font-black tracking-tight text-[#262438] mt-0.5"
            style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.1)' }}
          >
            {record.name}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-[#FF5A8D] mt-1 px-2">
            {config.tagline}
          </p>
        </div>

        {/* 설명 및 고학년용 팁 박스 */}
        <div className="mt-4 p-3.5 bg-white/90 border-2 border-[#262438] rounded-xl shadow-[2px_2px_0px_#262438] text-left">
          <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
            {config.description}
          </p>
          <div className="mt-2.5 pt-2 border-t border-dashed border-slate-300 flex items-start gap-1.5 text-[11px] text-slate-500">
            <span className="font-bold text-[#FF5A8D] shrink-0">TIP :</span>
            <span>{config.tips}</span>
          </div>
        </div>

        {/* 티켓 메타데이터 (확률 안내) */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 px-1 font-mono">
          <span>
            전체 수량: <strong className="text-slate-900">{config.count}개</strong> / 50개
          </span>
          <span>
            당첨 확률: <strong className="text-slate-900">{((config.count / 50) * 100).toFixed(0)}%</strong>
          </span>
        </div>

        {/* 액션 버튼들 */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="pixel-btn py-2.5 px-3 bg-[#FFFDF7] text-slate-700 hover:bg-slate-100 rounded-xl text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#262438]"
          >
            기록 보러가기
          </button>
          <button
            onClick={() => {
              onDrawAgain();
            }}
            disabled={isDrawing}
            className="pixel-btn py-2.5 px-3 bg-[#FF6B8B] hover:bg-[#FF5376] text-white rounded-xl text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#262438] flex items-center justify-center gap-1.5"
          >
            <PixelStar size={14} color="#FEF08A" />
            <span>한 번 더 뽑기!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
