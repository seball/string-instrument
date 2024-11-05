import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringNote, SequenceStep } from '../../models/types';

@Component({
  selector: 'app-sequence-builder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sequence-builder.component.html',
  styleUrls: ['./sequence-builder.component.css'],
})
export class SequenceBuilderComponent {
  @Input() strings: StringNote[] = [];
  @Output() playString = new EventEmitter<number>();

  sequence: SequenceStep[] = [];
  selectedNotes: number[] = [];

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
      this.sequence.push({
        noteIndices: [...this.selectedNotes],
      });
      this.selectedNotes = [];
    }
  }

  removeStep(index: number) {
    this.sequence.splice(index, 1);
  }

  clearSequence() {
    this.sequence = [];
    this.selectedNotes = [];
  }

  getNoteNames(indices: number[]): string {
    return indices.map((i) => this.strings[i].note).join(' + ');
  }

  async playSequence() {
    for (const step of this.sequence) {
      for (const index of step.noteIndices) {
        this.playString.emit(index);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}
