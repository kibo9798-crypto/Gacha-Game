import { PrizeTier } from '../types/draw';

class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // AudioContext will be initialized on user interaction
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // 기본 버튼 클릭 효과음 (8-bit square wave blip)
  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  // 뽑기 기계 회전음 (덜컹덜컹 캡슐 굴러가는 소리)
  public playMachineSpin() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const baseTime = this.ctx.currentTime;
    const ticks = [0.0, 0.12, 0.25, 0.4, 0.58, 0.78, 1.0, 1.25];

    ticks.forEach((offset, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      const freq = 180 + (idx % 3) * 60;
      osc.frequency.setValueAtTime(freq, baseTime + offset);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, baseTime + offset + 0.06);

      gain.gain.setValueAtTime(0.14, baseTime + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, baseTime + offset + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(baseTime + offset);
      osc.stop(baseTime + offset + 0.07);
    });
  }

  // 캡슐 뿅 나오는 소리
  public playCapsulePop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(960, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  // 당첨 결과 음악 (티어별 맞춤 8비트 사운드)
  public playResultSound(tier: PrizeTier) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    if (tier === 'dud') {
      // 꽝: 아쉬운 8비트 트롬본 (와-와-와-와앙)
      const dudNotes = [311.13, 293.66, 277.18, 246.94]; // Eb4 -> D4 -> Db4 -> B3
      dudNotes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        const start = now + i * 0.18;
        const duration = i === 3 ? 0.45 : 0.16;

        osc.frequency.setValueAtTime(freq, start);
        if (i === 3) {
          // 마지막 음 떨림 (wobble)
          osc.frequency.linearRampToValueAtTime(freq - 30, start + duration);
        }

        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + duration + 0.02);
      });
      return;
    }

    if (tier === 'legendary') {
      // 자유이용권: SSR 골드 대박 팡파레! (경쾌하고 웅장한 승리 멜로디)
      const melody = [
        { f: 523.25, d: 0.1 },  // C5
        { f: 659.25, d: 0.1 },  // E5
        { f: 783.99, d: 0.1 },  // G5
        { f: 1046.50, d: 0.15 }, // C6
        { f: 783.99, d: 0.1 },  // G5
        { f: 1046.50, d: 0.1 }, // C6
        { f: 1318.51, d: 0.45 }, // E6
      ];

      let elapsed = 0;
      melody.forEach((note) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        const start = now + elapsed;
        osc.frequency.setValueAtTime(note.f, start);

        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + note.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + note.d + 0.02);
        elapsed += note.d * 0.95;
      });
      return;
    }

    if (tier === 'epic') {
      // 학교 특권권 (청소 면제, 지각 면제 등): 신나는 팡파레
      const melody = [
        { f: 440.0, d: 0.1 },   // A4
        { f: 554.37, d: 0.1 },  // C#5
        { f: 659.25, d: 0.12 }, // E5
        { f: 880.0, d: 0.35 },  // A5
      ];
      let elapsed = 0;
      melody.forEach((note) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        const start = now + elapsed;
        osc.frequency.setValueAtTime(note.f, start);

        gain.gain.setValueAtTime(0.16, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + note.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + note.d + 0.02);
        elapsed += note.d * 0.95;
      });
      return;
    }

    if (tier === 'rare') {
      // 달콤한 2입, 3입: 상큼한 2음-3음 차임
      const melody = [
        { f: 523.25, d: 0.1 }, // C5
        { f: 659.25, d: 0.1 }, // E5
        { f: 783.99, d: 0.25 }, // G5
      ];
      let elapsed = 0;
      melody.forEach((note) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        const start = now + elapsed;
        osc.frequency.setValueAtTime(note.f, start);

        gain.gain.setValueAtTime(0.16, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + note.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + note.d + 0.02);
        elapsed += note.d * 0.95;
      });
      return;
    }

    // 일반 (달콤한 한입)
    const notes = [587.33, 880]; // D5 -> A5
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      const start = now + idx * 0.1;
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.2);
    });
  }
}

export const sound = new SoundEffects();
