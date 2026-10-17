import React, { useState } from 'react';
import { DrawRecord } from '../types/draw';
import { getItemConfig } from '../utils/lottery';
import { ItemPixelIcon, PixelStar } from './PixelIcons';
import { sound } from '../utils/audio';

interface HistoryListProps {
  totalCount: number;
  history: DrawRecord[];
  onReset: () => void;
  onSelectRecord?: (record: DrawRecord) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  totalCount,
  history,
  onReset,
  onSelectRecord,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 최신순 최대 10개
  const recentRecords = history.slice(0, 10);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleOpenReset = () => {
    sound.playClick();
    setShowConfirmModal(true);
  };

  const handleConfirmReset = () => {
    sound.playClick();
    setShowConfirmModal(false);
    onReset();
  };

  const handleCancelReset = () => {
    sound.playClick();
    setShowConfirmModal(false);
  };

  return (
    <div className="w-full bg-[#FFFDF7] border-3 border-[#262438] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#262438]">
      {/* 상단 헤더: 카운터 및 초기화 버튼 */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-[#262438]/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFE5EC] border-2 border-[#262438] flex items-center justify-center shadow-[1px_1px_0px_#262438]">
            <PixelStar size={16} color="#FF6B8B" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-[#262438]">
              최근 결과 기록
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              최신순 최대 10개 표시
            </p>
          </div>
        </div>

        {/* 아케이드 스타일 총 뽑은 횟수 카운터 */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 font-bold tracking-wider">
              TOTAL DRAWS
            </span>
            <div className="bg-[#262438] border-2 border-[#191826] px-2.5 py-0.5 rounded-md text-[#34D399] font-mono font-bold text-sm sm:text-base tracking-widest shadow-inner">
              {String(totalCount).padStart(3, '0')}회
            </div>
          </div>

          {/* 기록 초기화 버튼 */}
          <button
            onClick={handleOpenReset}
            disabled={totalCount === 0 && history.length === 0}
            className="pixel-btn py-1.5 px-2.5 bg-[#FFF0F4] hover:bg-[#FFE0E8] text-[#9E1F47] rounded-lg text-xs font-bold border-2 border-[#262438] shadow-[2px_2px_0px_#262438] cursor-pointer"
            title="기록 초기화"
          >
            기록 초기화
          </button>
        </div>
      </div>

      {/* 최근 결과 목록 */}
      <div className="mt-3">
        {recentRecords.length === 0 ? (
          <div className="py-8 text-center text-slate-400 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#FFF5F7] border-2 border-dashed border-[#262438]/30 flex items-center justify-center mb-2">
              <PixelStar size={20} color="#D1D5DB" />
            </div>
            <p className="text-xs font-bold text-slate-500">아직 뽑은 기록이 없어요!</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              중앙의 '뽑기!' 버튼을 눌러 오늘의 행운을 시험해 보세요.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {recentRecords.map((item, index) => {
              const cfg = getItemConfig(item.itemId);
              const isFirst = index === 0;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectRecord && onSelectRecord(item)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border-2 border-[#262438] transition-transform hover:-translate-y-0.5 cursor-pointer shadow-[2px_2px_0px_#262438] ${
                    isFirst ? 'bg-[#FFF9E6]' : 'bg-white'
                  }`}
                  style={{
                    borderLeftWidth: '5px',
                    borderLeftColor: cfg.accentColor,
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-9 h-9 rounded-lg border-2 border-[#262438] flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#262438]"
                      style={{ backgroundColor: cfg.bgColor }}
                    >
                      <ItemPixelIcon itemId={item.itemId} size={24} />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs sm:text-sm font-bold text-[#262438] truncate">
                          {item.name}
                        </span>
                        {isFirst && (
                          <span className="text-[9px] font-bold bg-[#FF6B8B] text-white px-1.5 py-0.2 rounded border border-[#262438]">
                            NEW!
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 truncate max-w-[200px] sm:max-w-[240px]">
                        {cfg.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 pl-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      {formatTime(item.drawnAt)}
                    </span>
                    <span className="text-[10px] font-bold text-[#FF5A8D]">
                      #{item.drawNumber}회차
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 기록 초기화 확인 다이얼로그 모달 */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="w-full max-w-[340px] bg-[#FFFDF7] border-4 border-[#262438] rounded-2xl p-5 shadow-[6px_6px_0px_#262438] text-center animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 mx-auto bg-[#FFE4E6] border-2 border-[#262438] rounded-full flex items-center justify-center mb-3">
              <span className="text-xl">⚠️</span>
            </div>
            <h4 id="confirm-modal-title" className="text-base font-black text-[#262438]">
              기록을 초기화할까요?
            </h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              지금까지 뽑은 총 <strong>{totalCount}회</strong>의 추첨 횟수와 모든 최근 결과 기록이 완전히 삭제됩니다.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={handleCancelReset}
                className="pixel-btn py-2 px-3 bg-[#FFFDF7] text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold border-2 border-[#262438] shadow-[2px_2px_0px_#262438]"
              >
                취소
              </button>
              <button
                onClick={handleConfirmReset}
                className="pixel-btn py-2 px-3 bg-[#FF4D79] hover:bg-[#E11D48] text-white rounded-xl text-xs font-bold border-2 border-[#262438] shadow-[2px_2px_0px_#262438]"
              >
                초기화하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
