import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringNote } from '../../models/types';

@Component({
  selector: 'app-string-instrument',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './string-instrument.component.html',
  styleUrls: ['./string-instrument.component.css'],
})
export class StringInstrumentComponent implements OnInit {
  mode: 'build' | 'practice' = 'build';

  strings: StringNote[] = [
    {
      note: 'D#3',
      fileName: 'Ds3',
      audio: new Audio(),
      isPlaying: false,
      runicSymbol: 'ᛆ',
    },
    {
      note: 'F#3',
      fileName: 'Fs3',
      audio: new Audio(),
      isPlaying: false,
      runicSymbol: 'ᛐ',
    },
    {
      note: 'A#3',
      fileName: 'As3',
      audio: new Audio(),
      isPlaying: false,
      runicSymbol: 'ᛘ',
    },
    {
      note: 'C#4',
      fileName: 'Cs4',
      audio: new Audio(),
      isPlaying: false,
      runicSymbol: 'ᛋ',
    },
    {
      note: 'D#4',
      fileName: 'Ds4',
      audio: new Audio(),
      isPlaying: false,
      runicSymbol: 'ᚽ',
    },
    {
      note: 'F4',
      fileName: 'F4',
      audio: new Audio(),
      isPlaying: false,
      runicSymbol: 'ᛮ',
    },
  ];

  // Sequence builder state
  selectedNotes: number[] = [];
  buildSequence: { noteIndices: number[] }[] = [];

  // Practice mode state
  practiceSequence = [
    'D#3',
    'A#3',
    'A#3',
    'C#4',
    'D#4',
    'D#4',
    'F4',
    'D#4',
    'C#4',
    'F#3',
    'C#4',
    'A#3',
  ];
  currentStep = 0;
  isPlaying = false;

  ngOnInit() {
    this.loadAudioFiles();
  }

  // Audio management
  private loadAudioFiles() {
    this.strings.forEach((string) => {
      string.audio.src = `/sounds/${string.fileName}.mp3`;
      string.audio.load();

      string.audio.addEventListener('canplaythrough', () => {
        console.log(`Sound loaded successfully: ${string.note}`);
      });

      string.audio.onerror = () => {
        console.error(`Error loading sound for note ${string.note}`);
      };
    });
  }

  // String interaction
  handleStringClick(index: number) {
    this.playString(index);

    if (this.mode === 'practice' && this.isPlaying) {
      const playedNote = this.strings[index].note;
      this.checkPracticeSequence(playedNote);
    }
  }

  private playString(index: number) {
    const string = this.strings[index];
    const audio = new Audio(string.audio.src);

    audio.play().catch((error) => {
      console.error('Error playing audio:', error, 'Note:', string.note);
    });

    string.isPlaying = true;
    setTimeout(() => {
      string.isPlaying = false;
    }, 300);
  }

  // Mode management
  setMode(newMode: 'build' | 'practice') {
    this.mode = newMode;
    this.resetState();
  }

  resetState() {
    this.currentStep = 0;
    this.isPlaying = false;
    this.strings.forEach((s) => (s.isNext = false));
    this.selectedNotes = [];
  }

  // Sequence builder methods
  toggleNoteSelection(index: number) {
    const position = this.selectedNotes.indexOf(index);
    if (position === -1) {
      this.selectedNotes.push(index);
    } else {
      this.selectedNotes.splice(position, 1);
    }
  }

  addToSequence() {
    if (this.selectedNotes.length > 0) {
      this.buildSequence.push({
        noteIndices: [...this.selectedNotes],
      });
      this.selectedNotes = [];
    }
  }

  removeStep(index: number) {
    this.buildSequence.splice(index, 1);
  }

  clearSequence() {
    this.buildSequence = [];
    this.selectedNotes = [];
  }

  getNoteNames(indices: number[]): string {
    return indices.map((i) => this.strings[i].note).join(' + ');
  }

  async playBuiltSequence() {
    for (const step of this.buildSequence) {
      for (const index of step.noteIndices) {
        this.playString(index);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  // Practice mode methods
  startPracticeMode() {
    this.mode = 'practice';
    this.isPlaying = true;
    this.currentStep = 0;
    this.highlightNextString();
  }

  private checkPracticeSequence(playedNote: string) {
    if (playedNote === this.practiceSequence[this.currentStep]) {
      this.currentStep++;
      if (this.currentStep >= this.practiceSequence.length) {
        this.isPlaying = false;
        this.strings.forEach((s) => (s.isNext = false));
        setTimeout(() => {
          alert('Sequence completed successfully!');
        }, 300);
      } else {
        this.highlightNextString();
      }
    } else {
      this.currentStep = 0;
      this.highlightNextString();
    }
  }

  private highlightNextString() {
    this.strings.forEach((s) => (s.isNext = false));
    if (this.currentStep < this.practiceSequence.length) {
      const nextNote = this.practiceSequence[this.currentStep];
      const stringIndex = this.strings.findIndex((s) => s.note === nextNote);
      if (stringIndex !== -1) {
        this.strings[stringIndex].isNext = true;
      }
    }
  }
}
