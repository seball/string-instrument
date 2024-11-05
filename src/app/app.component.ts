import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StringInstrumentComponent } from './components/string-instrument/string-instrument.component';
import { BalanceScaleComponent } from './components/balance-scale/balance-scale.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    StringInstrumentComponent,
    BalanceScaleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeTab: 'instrument' | 'scale' = 'instrument';

  setActiveTab(tab: 'instrument' | 'scale') {
    this.activeTab = tab;
  }
}
