import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressBuilderComponent } from './press-builder.component';

describe('PressBuilderComponent', () => {
  let component: PressBuilderComponent;
  let fixture: ComponentFixture<PressBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PressBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PressBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
