import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stone, ScaleState } from '../../models/types';

@Component({
  selector: 'app-balance-scale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance-scale.component.html',
  styleUrls: ['./balance-scale.component.css'],
})
export class BalanceScaleComponent {
  stones: Stone[] = [
    { id: 1, color: '#FF69B4', weight: 1, position: 'none', name: 'Pink' },
    { id: 2, color: '#90EE90', weight: 2, position: 'none', name: 'Green' },
    { id: 3, color: '#8A2BE2', weight: 3, position: 'none', name: 'Purple' },
    { id: 4, color: '#808080', weight: 4, position: 'none', name: 'Gray' },
    { id: 5, color: '#40E0D0', weight: 5, position: 'none', name: 'Turquoise' },
    { id: 6, color: '#FFA500', weight: 6, position: 'none', name: 'Orange' },
    { id: 7, color: '#0000FF', weight: 7, position: 'none', name: 'Blue' },
    { id: 8, color: '#8B4513', weight: 8, position: 'none', name: 'Brown' },
    { id: 9, color: '#FFFF00', weight: 9, position: 'none', name: 'Yellow' },
  ];

  scaleState: ScaleState = {
    leftWeight: 0,
    rightWeight: 0,
    tilt: 'balanced',
  };

  placeStone(stone: Stone, position: 'left' | 'right' | 'none') {
    // Remove stone from previous position
    if (stone.position !== 'none') {
      this.updateWeight(stone.position, -stone.weight);
    }

    // Place stone in new position
    stone.position = position;
    if (position !== 'none') {
      this.updateWeight(position, stone.weight);
    }

    this.calculateTilt();
  }

  private updateWeight(position: 'left' | 'right', weight: number) {
    if (position === 'left') {
      this.scaleState.leftWeight += weight;
    } else {
      this.scaleState.rightWeight += weight;
    }
  }

  private calculateTilt() {
    if (this.scaleState.leftWeight > this.scaleState.rightWeight) {
      this.scaleState.tilt = 'left';
    } else if (this.scaleState.leftWeight < this.scaleState.rightWeight) {
      this.scaleState.tilt = 'right';
    } else {
      this.scaleState.tilt = 'balanced';
    }
  }

  reset() {
    this.stones.forEach((stone) => (stone.position = 'none'));
    this.scaleState = {
      leftWeight: 0,
      rightWeight: 0,
      tilt: 'balanced',
    };
  }
}
