import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressNewsComponent } from './press-news.component';

describe('PressNewsComponent', () => {
  let component: PressNewsComponent;
  let fixture: ComponentFixture<PressNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PressNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PressNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
