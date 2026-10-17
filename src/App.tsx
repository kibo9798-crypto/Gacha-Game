import React, { useState, useEffect, useCallback } from 'react';
import { DrawRecord } from './types/draw';
import {
  drawRandomTicket,
  INITIAL_VERIFICATION,
  loadSavedHistory,
  loadSavedTotalCount,
  saveHistory,
  saveTotalCount,
  STORAGE_KEYS,
} from './utils/lottery';
import { sound } from './utils/audio';
import { GachaMachine } from './components/GachaMachine';
import { ResultCard } from './components/ResultCard';
import { HistoryList } from './components/HistoryList';
import { TicketProbabilityModal } from './components/TicketProbabilityModal';
import { PixelDecorations } from './components/PixelDecorations';
import { PixelHeart, PixelStar } from './components/PixelIcons';

export default function App() {
  const [totalCount, setTotalCount] = useState<number>(() => loadSavedTotalCount());
  const [history, setHistory] = useState<DrawRecord[]>(() => loadSavedHistory());
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

  // 사운드 상태 동기화
  useEffect(() => {
    sound.setMuted(isMuted);
    try {
      localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, (!isMuted).toString());
    } catch {
      // ignore
    }
  }, [isMuted]);

  // 기록 변경 시 로컬스토리지 저장
  useEffect(() => {
    saveHistory(history);
  }, [history]);

  useEffect(() => {
    saveTotalCount(totalCount);
  }, [totalCount]);

  // 메인 뽑기 실행 함수
  const handleDraw = useCallback(() => {
    if (isDrawing) return;

    setIsDrawing(true);
    setCurrentResult(null);

    // 8비트 기계 회전음 재생
    sound.playMachineSpin();

    // 1.3초간 픽셀 흔들림/회전 애니메이션 후 결과 생성 및 팝업
    setTimeout(() => {
      sound.playCapsulePop();

      // 50개 티켓 풀에서 균등 무작위 독립 추출
      const ticket = drawRandomTicket();
      const newCount = totalCount + 1;

      const record: DrawRecord = {
        id: `draw-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        ticketUid: ticket.uid,
        ticketIndex: ticket.ticketIndex,
        itemId: ticket.itemId,
        name: ticket.name,
        tier: ticket.tier,
        drawnAt: Date.now(),
        drawNumber: newCount,
      };

      setTotalCount(newCount);
      setHistory((prev) => [record, ...prev]);
      setCurrentResult(record);
      setIsDrawing(false);
    }, 1300);
  }, [isDrawing, totalCount]);

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

  // 기록 초기화
  const handleReset = () => {
    setTotalCount(0);
    setHistory([]);
    setCurrentResult(null);
  };

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) {
      sound.playClick();
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#262438] flex flex-col relative font-sans">
      {/* 8-bit 배경 장식 (파스텔 픽셀 별 & 하트) */}
      <PixelDecorations />

      {/* 상단 네비게이션 & 헤더 */}
      <header className="relative z-10 w-full border-b-3 border-[#262438] bg-[#FFE5EC]/80 backdrop-blur-xs px-4 py-3 sm:py-3.5 shadow-[0_2px_0_#262438]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* 타이틀 및 8비트 로고 */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#FEF3C7] border-2 border-[#262438] rounded-lg flex items-center justify-center shadow-[2px_2px_0px_#262438] animate-pixel-bounce">
              <PixelStar size={20} color="#F59E0B" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Press_Start_2P'] text-xs sm:text-sm font-bold text-[#FF5A8D] tracking-tight">
                  POINT DRAW
                </span>
                <span className="text-[10px] bg-[#34D399] text-white px-1.5 py-0.2 rounded font-bold border border-[#262438]">
                  v1.0
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-black text-[#262438] leading-tight">
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
              className="pixel-btn py-1.5 px-2.5 sm:px-3 bg-[#FFFDF7] hover:bg-[#FEF9C3] text-slate-800 rounded-xl text-xs font-bold border-2 border-[#262438] shadow-[2px_2px_0px_#262438] flex items-center gap-1.5 cursor-pointer"
              title="티켓 50개 구성 및 확률 보기"
            >
              <PixelStar size={14} color="#D97706" />
              <span className="hidden sm:inline">확률표 (50장)</span>
              <span className="sm:hidden">확률표</span>
            </button>

            <button
              onClick={toggleSound}
              className={`pixel-btn py-1.5 px-2.5 rounded-xl text-xs font-bold border-2 border-[#262438] shadow-[2px_2px_0px_#262438] flex items-center gap-1 cursor-pointer ${
                isMuted
                  ? 'bg-slate-200 text-slate-500'
                  : 'bg-[#BAF2DF] text-[#065F46] hover:bg-[#A3EED7]'
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

      {/* 메인 콘텐츠 영역 */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        {/* 첫 화면 메인 타이틀 & 슬로건 */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FEF9C3] border-2 border-[#262438] rounded-full text-xs font-bold text-[#854D0E] shadow-[2px_2px_0px_#262438] mb-2">
            <PixelHeart size={14} color="#FF6B8B" />
            <span>50 TICKETS POOL · INDEPENDENT DRAW</span>
            <PixelStar size={14} color="#F59E0B" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#262438] tracking-tight">
            포인트 뽑기
          </h2>
          <p className="text-sm sm:text-base font-bold text-[#FF5A8D] mt-1 sm:mt-1.5">
            오늘의 행운을 뽑아 보세요!
          </p>

          <p className="text-xs sm:text-[13px] text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
            자유이용권, 청소는 없다, 지각 면제권, 맛있는 간식 찬스까지!
            <br />
            당신의 손끝에서 터지는 50장의 8비트 행운을 지금 확인하세요.
          </p>
        </div>

        {/* 2컬럼 레이아웃: 뽑기 기계(좌) + 현황 및 최근 기록(우) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* 좌측: 픽셀 스타일 뽑기 기계 & 뽑기 버튼 */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <GachaMachine isDrawing={isDrawing} onDraw={handleDraw} />

            {/* 검증 상태 안내 칩 */}
            <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500 bg-[#FFFDF7] border border-[#262438]/20 px-3 py-1 rounded-md">
              <span className="text-emerald-500 font-bold">●</span>
              <span>
                시스템 무결성: 총 <strong>{INITIAL_VERIFICATION.totalTickets}개</strong> 검증 완료
              </span>
            </div>
          </div>

          {/* 우측: 최근 결과 기록 및 카운터 */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <HistoryList
              totalCount={totalCount}
              history={history}
              onReset={handleReset}
              onSelectRecord={(rec) => setCurrentResult(rec)}
            />

            {/* 고학년용 팁 카드 */}
            <div className="bg-[#FFF8E7] border-3 border-[#262438] rounded-2xl p-4 shadow-[3px_3px_0px_#262438]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm">💡</span>
                <h4 className="text-xs sm:text-sm font-black text-[#854D0E]">
                  선생님 & 친구들과 함께하는 꿀팁!
                </h4>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 font-medium list-disc list-inside">
                <li>
                  <strong>자유이용권(1장, 2%)</strong>은 50장 중 단 1장뿐인 레전드 티켓입니다!
                </li>
                <li>
                  <strong>청소는 없다 & 지각 면제권(각 2장)</strong>은 선생님께 승인받고 사용해보세요.
                </li>
                <li>
                  <strong>꽝(1장, 2%)</strong>이 나와도 슬퍼하지 마세요. 2%의 기적을 뚫은 행운아입니다!
                </li>
              </ul>
            </div>
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
      <footer className="relative z-10 w-full border-t-3 border-[#262438] bg-[#FFE5EC] px-4 py-4 text-center mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm font-black text-[#262438]">
          <div className="flex items-center gap-1.5 text-[#FF5A8D]">
            <PixelStar size={16} color="#FF6B8B" />
            <span className="tracking-wide text-base sm:text-lg">행운은 당신의 것!</span>
            <PixelHeart size={16} color="#FF6B8B" />
          </div>

          <div className="text-[11px] font-normal text-slate-600 flex items-center gap-2">
            <span>포인트 뽑기 · POINT DRAW</span>
            <span>|</span>
            <span>HTML · CSS · JS 기반</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
