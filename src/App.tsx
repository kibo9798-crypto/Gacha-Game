import React, { useState, useEffect, useCallback } from 'react';
import { DrawRecord } from './types/draw';
import {
  drawWithFullReset,
  INITIAL_VERIFICATION,
  purgeSavedRecords,
  STORAGE_KEYS,
} from './utils/lottery';
import { sound } from './utils/audio';
import { GachaMachine } from './components/GachaMachine';
import { ResultCard } from './components/ResultCard';
import { TicketProbabilityModal } from './components/TicketProbabilityModal';
import { PixelDecorations } from './components/PixelDecorations';
import { PixelClover, PixelStar } from './components/PixelIcons';

export default function App() {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<DrawRecord | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED) === 'false';
    } catch {
      return false;
    }
  });
  const [showProbModal, setShowProbModal] = useState<boolean>(false);

  // 컴포넌트 마운트 시 기존의 모든 과거 기록 즉시 영구 삭제
  useEffect(() => {
    purgeSavedRecords();
  }, []);

  // 사운드 상태 동기화
  useEffect(() => {
    sound.setMuted(isMuted);
    try {
      localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, (!isMuted).toString());
    } catch {
      // ignore
    }
  }, [isMuted]);

  // 메인 뽑기 실행 함수: 매번 뽑을 때마다 확률 100% 완전 리셋
  const handleDraw = useCallback(() => {
    if (isDrawing) return;

    setIsDrawing(true);
    setCurrentResult(null);

    // 8비트 기계 회전음 재생
    sound.playMachineSpin();

    // 1.3초간 픽셀 흔들림/회전 애니메이션 후 결과 생성 및 팝업
    setTimeout(() => {
      sound.playCapsulePop();

      // ★ 매번 50개 티켓 풀을 100% 신규 리셋하여 1장 균등 무작위 추첨
      const ticket = drawWithFullReset();

      const record: DrawRecord = {
        id: `draw-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        ticketUid: ticket.uid,
        ticketIndex: ticket.ticketIndex,
        itemId: ticket.itemId,
        name: ticket.name,
        tier: ticket.tier,
        drawnAt: Date.now(),
        drawNumber: 1,
      };

      // 이전 기록을 누적하지 않고 현재 단일 결과만 표시
      setCurrentResult(record);
      setIsDrawing(false);
    }, 1300);
  }, [isDrawing]);

  // 키보드 스페이스바 / 엔터로 편리하게 뽑기 지원
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        const target = e.target as HTMLElement;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
          return;
        }
        if (!isDrawing && !currentResult && !showProbModal) {
          e.preventDefault();
          handleDraw();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDraw, isDrawing, currentResult, showProbModal]);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) {
      sound.playClick();
    }
  };

  return (
    <div className="min-h-screen bg-[#E6F7F2] text-[#134E48] flex flex-col relative font-sans">
      {/* 8-bit 민트 도트 배경 매트릭스 & 부유 오브젝트 */}
      <PixelDecorations />

      {/* 상단 네비게이션 & 민트 아케이드 헤더 */}
      <header className="relative z-10 w-full border-b-3 border-[#134E48] bg-[#CCFBF1]/85 backdrop-blur-xs px-4 py-3 sm:py-3.5 shadow-[0_2px_0_#134E48]">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* 타이틀 및 8비트 민트 로고 */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#A7F3D0] border-2 border-[#134E48] rounded-lg flex items-center justify-center shadow-[2px_2px_0px_#134E48] animate-pixel-bounce">
              <PixelClover size={20} color="#047857" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Press_Start_2P'] text-xs sm:text-sm font-bold text-[#0D9488] tracking-tight">
                  POINT DRAW
                </span>
                <span className="text-[10px] bg-[#059669] text-white px-1.5 py-0.2 rounded font-bold border border-[#134E48]">
                  RESET 100%
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-black text-[#134E48] leading-tight">
                포인트 뽑기
              </h1>
            </div>
          </div>

          {/* 오른쪽 유틸리티 버튼들 (사운드 토글 & 확률 정보) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setShowProbModal(true);
              }}
              className="pixel-btn py-1.5 px-2.5 sm:px-3 bg-[#F0FDF9] hover:bg-[#99F6E4] text-[#134E48] rounded-xl text-xs font-bold border-2 border-[#134E48] shadow-[2px_2px_0px_#134E48] flex items-center gap-1.5 cursor-pointer"
              title="티켓 50개 구성 및 확률 보기"
            >
              <PixelStar size={14} color="#D97706" />
              <span className="hidden sm:inline">확률표 (50장)</span>
              <span className="sm:hidden">확률표</span>
            </button>

            <button
              onClick={toggleSound}
              className={`pixel-btn py-1.5 px-2.5 rounded-xl text-xs font-bold border-2 border-[#134E48] shadow-[2px_2px_0px_#134E48] flex items-center gap-1 cursor-pointer ${
                isMuted
                  ? 'bg-slate-200 text-slate-500'
                  : 'bg-[#99F6E4] text-[#047857] hover:bg-[#5EEAD4]'
              }`}
              title={isMuted ? '소리 켜기' : '소리 끄기'}
              aria-label={isMuted ? '소리 켜기' : '소리 끄기'}
            >
              <span>{isMuted ? '🔇' : '🔊'}</span>
              <span className="hidden md:inline">{isMuted ? '음소거' : '효과음 ON'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 영역: 뽑기 기계가 중앙에서 시선을 사로잡는 구조 */}
      <main className="relative z-10 flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
        {/* 첫 화면 메인 타이틀 & 슬로건 */}
        <div className="text-center mb-6 sm:mb-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#CCFBF1] border-2 border-[#134E48] rounded-full text-xs font-bold text-[#065F46] shadow-[2px_2px_0px_#134E48] mb-2">
            <PixelClover size={14} color="#059669" />
            <span className="font-['Press_Start_2P'] text-[9px] sm:text-[10px]">
              EACH DRAW 100% PROBABILITY RESET
            </span>
            <PixelStar size={14} color="#F59E0B" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#134E48] tracking-tight">
            포인트 뽑기
          </h2>
          <p className="text-sm sm:text-base font-bold text-[#0D9488] mt-1 sm:mt-1.5">
            오늘의 행운을 뽑아 보세요!
          </p>

          <p className="text-xs sm:text-[13px] text-[#0F766E] max-w-md mx-auto mt-2 leading-relaxed font-medium">
            자유이용권, 청소는 없다, 지각 면제권, 달콤한 간식 찬스까지!
            <br />
            <strong>한 번 뽑을 때마다 50개 티켓 확률이 100% 새로 리셋</strong>됩니다.
          </p>
        </div>

        {/* 중앙 집중형 픽셀 스타일 민트 뽑기 기계 */}
        <div className="w-full flex flex-col items-center">
          <GachaMachine
            isDrawing={isDrawing}
            onDraw={handleDraw}
          />

          {/* 무결성 및 매회 리셋 상태 배너 */}
          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-[#065F46] bg-[#CCFBF1] border border-[#134E48]/30 px-3.5 py-1 rounded-md shadow-xs">
            <span className="text-[#059669] font-bold">●</span>
            <span>
              매회 50장 풀 100% 자동 리셋 · 독립 추첨 ({INITIAL_VERIFICATION.totalTickets}/50)
            </span>
          </div>
        </div>
      </main>

      {/* 결과 카드 모달 (추첨 완료 시 팝업) */}
      {currentResult && (
        <ResultCard
          record={currentResult}
          onClose={() => setCurrentResult(null)}
          onDrawAgain={handleDraw}
          isDrawing={isDrawing}
        />
      )}

      {/* 확률 및 티켓 상세 모달 */}
      {showProbModal && (
        <TicketProbabilityModal onClose={() => setShowProbModal(false)} />
      )}

      {/* 화면 하단 푸터 ('행운은 당신의 것!') */}
      <footer className="relative z-10 w-full border-t-3 border-[#134E48] bg-[#CCFBF1] px-4 py-4 text-center mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm font-black text-[#134E48]">
          <div className="flex items-center gap-1.5 text-[#0D9488]">
            <PixelClover size={18} color="#059669" />
            <span className="tracking-wide text-base sm:text-lg font-black">
              행운은 당신의 것!
            </span>
            <PixelStar size={16} color="#F59E0B" />
          </div>

          <div className="text-[11px] font-normal text-[#0F766E] flex items-center gap-2 font-mono">
            <span>포인트 뽑기 · POINT DRAW</span>
            <span>|</span>
            <span>100% RESET PER DRAW</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
