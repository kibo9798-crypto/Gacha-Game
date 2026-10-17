import React from 'react';
import { TICKET_CONFIGS, TOTAL_TICKETS, INITIAL_VERIFICATION } from '../utils/lottery';
import { ItemPixelIcon, PixelHeart, PixelStar } from './PixelIcons';
import { sound } from '../utils/audio';

interface TicketProbabilityModalProps {
  onClose: () => void;
}

export const TicketProbabilityModal: React.FC<TicketProbabilityModalProps> = ({ onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="prob-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-[480px] max-h-[85vh] bg-[#FFFDF7] border-4 border-[#262438] rounded-2xl p-5 shadow-[8px_8px_0px_#262438] flex flex-col">
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

        {/* 모달 헤더 */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] border-2 border-[#262438] flex items-center justify-center shadow-[1px_1px_0px_#262438]">
            <PixelStar size={18} color="#D97706" />
          </div>
          <div>
            <h3 id="prob-modal-title" className="text-base sm:text-lg font-black text-[#262438]">
              티켓 50개 구성 & 당첨 확률
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              독립 균등 무작위 추첨 (복원 추출)
            </p>
          </div>
        </div>

        {/* 무결성 검증 배너 */}
        <div className="mb-3 p-2.5 bg-[#ECFDF5] border-2 border-[#10B981] rounded-xl flex items-center justify-between text-xs font-bold text-[#065F46] shadow-[2px_2px_0px_#10B981]">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">✅</span>
            <span>시스템 무결성 검증 완료</span>
          </div>
          <span className="font-mono bg-white/80 px-2 py-0.5 rounded border border-[#10B981]">
            총 {INITIAL_VERIFICATION.totalTickets} / {TOTAL_TICKETS}장 일치
          </span>
        </div>

        {/* 50개 티켓 목록 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2">
          {TICKET_CONFIGS.map((item) => {
            const percentage = ((item.count / TOTAL_TICKETS) * 100).toFixed(0);
            return (
              <div
                key={item.id}
                className="p-2.5 rounded-xl border-2 border-[#262438] flex items-center justify-between gap-3 shadow-[2px_2px_0px_#262438]"
                style={{ backgroundColor: item.bgColor }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-white/90 border-2 border-[#262438] flex items-center justify-center shrink-0">
                    <ItemPixelIcon itemId={item.id} size={24} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-black text-[#262438] truncate">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-500">
                        ({item.count}개)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate max-w-[200px] sm:max-w-[260px]">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs sm:text-sm font-black font-mono text-[#FF5A8D]">
                    {percentage}%
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono">
                    {item.count}/{TOTAL_TICKETS}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 모달 하단 닫기 버튼 */}
        <div className="mt-4 pt-3 border-t-2 border-[#262438]/20 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <PixelHeart size={12} color="#FF6B8B" />
            <span>모든 티켓은 동일한 확률로 추첨됩니다</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="pixel-btn py-1.5 px-4 bg-[#FFFDF7] hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border-2 border-[#262438] shadow-[2px_2px_0px_#262438]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
