import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanLandingPageComponent } from './urban-landing-page.component';

describe('UrbanLandingPageComponent', () => {
  let component: UrbanLandingPageComponent;
  let fixture: ComponentFixture<UrbanLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrbanLandingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UrbanLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
