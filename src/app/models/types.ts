// models/types.ts
export interface StringNote {
  note: string;
  fileName: string;
  audio: HTMLAudioElement;
  isPlaying: boolean;
  isNext?: boolean;
  runicSymbol: string;
}

export interface SequenceStep {
  noteIndices: number[];
}
export interface Stone {
  id: number;
  color: string;
  weight: number;
  position: 'none' | 'left' | 'right';
  name: string;
}

export interface ScaleState {
  leftWeight: number;
  rightWeight: number;
  tilt: 'left' | 'right' | 'balanced';
}
