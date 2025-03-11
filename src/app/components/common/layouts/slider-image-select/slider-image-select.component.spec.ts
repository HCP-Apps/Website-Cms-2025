import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderImageSelectComponent } from './slider-image-select.component';

describe('SliderImageSelectComponent', () => {
  let component: SliderImageSelectComponent;
  let fixture: ComponentFixture<SliderImageSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderImageSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SliderImageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
