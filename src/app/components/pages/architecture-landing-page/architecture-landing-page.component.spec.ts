import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureLandingPageComponent } from './architecture-landing-page.component';

describe('ArchitectureLandingPageComponent', () => {
  let component: ArchitectureLandingPageComponent;
  let fixture: ComponentFixture<ArchitectureLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureLandingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchitectureLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
