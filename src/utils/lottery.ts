import { PrizeTier, Ticket, TicketItemConfig, VerificationResult } from '../types/draw';

// 정확한 50개 티켓 규격 정의
export const TICKET_CONFIGS: TicketItemConfig[] = [
  {
    id: 'sweet-1',
    name: '달콤한 한입',
    count: 36,
    tier: 'common',
    category: 'snack',
    tagline: '달콤함 한 스푼! 소소하지만 기분 좋은 간식 찬스',
    description: '맛있는 간식이나 사탕, 젤리를 딱 한 입 기분 좋게 냠냠 먹는 소확행!',
    tips: '기본에 충실한 행운! 당 떨어질 때 최고의 치료제예요.',
    bgColor: '#FFF5F7',
    borderColor: '#FFB7CE',
    accentColor: '#FF6B8B',
    textColor: '#832A44',
  },
  {
    id: 'sweet-2',
    name: '달콤한 두입',
    count: 3,
    tier: 'rare',
    category: 'snack',
    tagline: '한 입으론 아쉬웠지? 넉넉하게 두 입!',
    description: '친구들의 부러운 시선 속에 달콤한 간식을 두 입 즐기는 기쁨!',
    tips: '더블 간식권! 나눠 먹어도 좋고 혼자 두 번 행복해도 좋아요.',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    accentColor: '#F59E0B',
    textColor: '#92400E',
  },
  {
    id: 'sweet-3',
    name: '달콤한 세입',
    count: 1,
    tier: 'rare',
    category: 'snack',
    tagline: '달콤함 3연타! 간식의 최강자',
    description: '단 1장뿐인 간식 3연타 찬스! 달콤한 행복이 입안 가득 터집니다.',
    tips: '50개 중 단 1장! 간식 부문 최고 잭팟을 뽑으셨습니다!',
    bgColor: '#FEF3C7',
    borderColor: '#F59E0B',
    accentColor: '#D97706',
    textColor: '#78350F',
  },
  {
    id: 'no-cleaning',
    name: '청소는 없다',
    count: 2,
    tier: 'epic',
    category: 'school-pass',
    tagline: '오늘 방과 후 청소당번 당당하게 탈출!',
    description: '빗자루 던지고 바로 하교! 칠판 털기, 분리수거, 바닥 쓸기 완전 면제!',
    tips: '선생님께 이 카드를 당당하게 제시하세요! (단, 쓰레기 무단 투기는 금지)',
    bgColor: '#ECFDF5',
    borderColor: '#6EE7B7',
    accentColor: '#10B981',
    textColor: '#065F46',
  },
  {
    id: 'stand-behind',
    name: '내 뒤로 서!',
    count: 2,
    tier: 'epic',
    category: 'school-pass',
    tagline: '급식실 선두권 합류! 친구야 내 뒤로 와라',
    description: '줄 서기 최강 특권! 맛있는 급식 메뉴가 나오는 날, 가장 빛을 발하는 찬스!',
    tips: '급식 메뉴가 맛있는 돈까스나 스파게티인 날 사용하면 효과 200%!',
    bgColor: '#EFF6FF',
    borderColor: '#93C5FD',
    accentColor: '#3B82F6',
    textColor: '#1E40AF',
  },
  {
    id: 'seat-swap',
    name: '1일 자리 바꾸기',
    count: 2,
    tier: 'epic',
    category: 'school-pass',
    tagline: '오늘 하루, 내가 꿈꾸던 명당자리로!',
    description: '창가 맨 뒷자리? 친한 친구 옆자리? 하루 동안 원하는 자리로 체인지!',
    tips: '선생님과 협의 후 당일 하루 동안 특별한 명당을 누려보세요.',
    bgColor: '#FAF5FF',
    borderColor: '#D8B4FE',
    accentColor: '#8B5CF6',
    textColor: '#5B21B6',
  },
  {
    id: 'no-late',
    name: '지각 면제권',
    count: 2,
    tier: 'epic',
    category: 'school-pass',
    tagline: '이불 속 5분 더! 아침이 여유로워지는 마법',
    description: '어쩌다 늦잠 잔 날, 가슴 졸이지 않고 당당하게 세이프되는 전설의 패스!',
    tips: '정말 아슬아슬하게 지각할 것 같은 위기의 날 든든한 방패가 되어줍니다.',
    bgColor: '#FFF7ED',
    borderColor: '#FDBA74',
    accentColor: '#F97316',
    textColor: '#9A3412',
  },
  {
    id: 'boom',
    name: '꽝',
    count: 1,
    tier: 'dud',
    category: 'trap',
    tagline: '2%의 기적(?)을 뚫고 걸린 유일무이 꽝!',
    description: '50장 중 단 1장뿐인 꽝에 당첨되셨습니다! 사실 2% 확률을 뽑은 당신의 운도 대단합니다.',
    tips: '좌절 금지! 이 기운을 모아 다음 뽑기에서는 대박 찬스가 기다리고 있어요.',
    bgColor: '#F1F5F9',
    borderColor: '#CBD5E1',
    accentColor: '#64748B',
    textColor: '#334155',
  },
  {
    id: 'free-pass',
    name: '자유이용권',
    count: 1,
    tier: 'legendary',
    category: 'special',
    tagline: '★SSR 절대 권력★ 50개 중 단 1개의 골든 티켓!',
    description: '원하는 찬스 1회 자유 선택권! 청소 면제, 자리 바꾸기, 급식 찬스 무엇이든 내 맘대로!',
    tips: '전체 50장 중 확률 단 2%! 오늘 당신은 학교의 주인공입니다.',
    bgColor: '#FEF9C3',
    borderColor: '#FACC15',
    accentColor: '#CA8A04',
    textColor: '#713F12',
  },
];

export const TOTAL_TICKETS = 50;

/**
 * 50개의 개별 티켓 신규 생성 (매 뽑기마다 확률 100% 완전 초기화/리셋)
 */
export function generateFreshTicketPool(): Ticket[] {
  const tickets: Ticket[] = [];
  let indexCounter = 1;

  for (const item of TICKET_CONFIGS) {
    for (let i = 0; i < item.count; i++) {
      tickets.push({
        uid: `ticket-${item.id}-${i + 1}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        ticketIndex: indexCounter++,
        itemId: item.id,
        name: item.name,
        tier: item.tier,
      });
    }
  }

  return tickets;
}

/**
 * 티켓 총수 및 항목별 개수 무결성 검증
 */
export function verifyTicketPool(tickets: Ticket[]): VerificationResult {
  const errors: string[] = [];
  const total = tickets.length;
  const isValidTotal = total === TOTAL_TICKETS;

  if (!isValidTotal) {
    errors.push(`총 티켓 수 오류: 기대치 ${TOTAL_TICKETS}개, 실제 ${total}개`);
  }

  const breakdown = TICKET_CONFIGS.map((config) => {
    const actual = tickets.filter((t) => t.itemId === config.id).length;
    const isMatches = actual === config.count;
    if (!isMatches) {
      errors.push(`항목 '${config.name}' 개수 오류: 기대치 ${config.count}개, 실제 ${actual}개`);
    }
    return {
      name: config.name,
      actualCount: actual,
      expectedCount: config.count,
      isValid: isMatches,
    };
  });

  return {
    isValid: isValidTotal && errors.length === 0,
    totalTickets: total,
    expectedTotal: TOTAL_TICKETS,
    breakdown,
    errors,
  };
}

export const INITIAL_VERIFICATION: VerificationResult = verifyTicketPool(generateFreshTicketPool());

/**
 * 매번 뽑을 때마다 확률과 티켓 풀을 100% 새로 리셋하여 1장을 균등 무작위 추첨
 */
export function drawWithFullReset(): Ticket {
  // 1. 매 뽑기마다 50개 티켓 풀 새로 생성 & 리셋 (항목별 확률 100% 원복)
  const freshPool = generateFreshTicketPool();
  // 2. 50개 중 1개 균등 무작위 선택
  const randomIndex = Math.floor(Math.random() * freshPool.length);
  return freshPool[randomIndex];
}

/**
 * 아이템 ID로 설정 정보 가져오기
 */
export function getItemConfig(itemId: string): TicketItemConfig {
  const config = TICKET_CONFIGS.find((c) => c.id === itemId);
  if (!config) {
    return TICKET_CONFIGS[0];
  }
  return config;
}

/**
 * 모든 과거 기록 완전 삭제 함수
 */
export const STORAGE_KEYS = {
  SOUND_ENABLED: 'point_draw_sound_v1',
  HISTORY: 'point_draw_history_v1',
  TOTAL_COUNT: 'point_draw_total_count_v1',
};

export function purgeSavedRecords(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.TOTAL_COUNT);
    localStorage.removeItem('point_draw_history');
    localStorage.removeItem('point_draw_total_count');
  } catch (e) {
    console.error('Failed to purge records', e);
  }
}
