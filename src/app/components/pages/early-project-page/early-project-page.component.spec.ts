import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyProjectPageComponent } from './early-project-page.component';

describe('EarlyProjectPageComponent', () => {
  let component: EarlyProjectPageComponent;
  let fixture: ComponentFixture<EarlyProjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarlyProjectPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EarlyProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
