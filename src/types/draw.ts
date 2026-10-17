export type PrizeTier = 'legendary' | 'epic' | 'rare' | 'common' | 'dud';

export interface TicketItemConfig {
  id: string;
  name: string;
  count: number;
  tier: PrizeTier;
  category: 'snack' | 'school-pass' | 'special' | 'trap';
  tagline: string;
  description: string;
  tips: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  textColor: string;
}

export interface Ticket {
  uid: string; // unique ID for each of the 50 tickets
  ticketIndex: number; // 1 to 50
  itemId: string;
  name: string;
  tier: PrizeTier;
}

export interface DrawRecord {
  id: string;
  ticketUid: string;
  ticketIndex: number;
  itemId: string;
  name: string;
  tier: PrizeTier;
  drawnAt: number;
  drawNumber: number;
}

export interface VerificationResult {
  isValid: boolean;
  totalTickets: number;
  expectedTotal: number;
  breakdown: {
    name: string;
    actualCount: number;
    expectedCount: number;
    isValid: boolean;
  }[];
  errors: string[];
}
