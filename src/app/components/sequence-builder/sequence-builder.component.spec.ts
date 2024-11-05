import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceBuilderComponent } from './sequence-builder.component';

describe('SequenceBuilderComponent', () => {
  let component: SequenceBuilderComponent;
  let fixture: ComponentFixture<SequenceBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SequenceBuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SequenceBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
