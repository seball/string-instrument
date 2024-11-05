import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringInstrumentComponent } from './string-instrument.component';

describe('StringInstrumentComponent', () => {
  let component: StringInstrumentComponent;
  let fixture: ComponentFixture<StringInstrumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StringInstrumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StringInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
