import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringNote } from '../../models/types';

@Component({
  selector: 'app-practice-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practice-mode.component.html',
  styleUrls: ['./practice-mode.component.css'],
})
export class PracticeModeComponent {
  @Input() strings: StringNote[] = [];
  @Input() sequence: string[] = [];
  @Output() playString = new EventEmitter<number>();

  currentStep = 0;
  isPlaying = false;

  startPractice() {
    console.log('Starting practice');
    this.isPlaying = true;
    this.currentStep = 0;
    this.highlightNextString();
  }

  onNotePlayed(playedNote: string) {
    if (!this.isPlaying) {
      console.log('Not in playing mode');
      return;
    }

    const expectedNote = this.sequence[this.currentStep];
    console.log(
      'Note played:',
      playedNote,
      'Expected:',
      expectedNote,
      'Current step:',
      this.currentStep
    );

    if (playedNote === expectedNote) {
      console.log('Correct note!');
      this.currentStep++;

      if (this.currentStep >= this.sequence.length) {
        console.log('Sequence completed!');
        this.isPlaying = false;
        this.strings.forEach((s) => (s.isNext = false));
        setTimeout(() => {
          alert('Sequence completed successfully!');
        }, 300);
      } else {
        console.log('Moving to next note');
        this.highlightNextString();
      }
    } else {
      console.log('Wrong note!');
      this.currentStep = 0;
      this.highlightNextString();
      setTimeout(() => {
        alert('Wrong note! Starting over...');
      }, 300);
    }
  }

  private highlightNextString() {
    // Clear all highlights
    this.strings.forEach((s) => (s.isNext = false));

    // Highlight next string in sequence
    if (this.currentStep < this.sequence.length) {
      const nextNote = this.sequence[this.currentStep];
      console.log('Highlighting next note:', nextNote);
      const stringIndex = this.strings.findIndex((s) => s.note === nextNote);
      console.log('String index:', stringIndex);
      if (stringIndex !== -1) {
        this.strings[stringIndex].isNext = true;
      }
    }
  }

  resetPractice() {
    console.log('Resetting practice');
    this.currentStep = 0;
    this.isPlaying = false;
    this.strings.forEach((s) => (s.isNext = false));
  }
}
