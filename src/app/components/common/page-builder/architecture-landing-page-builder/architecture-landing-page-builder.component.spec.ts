import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureLandingPageBuilderComponent } from './architecture-landing-page-builder.component';

describe('ArchitectureLandingPageBuilderComponent', () => {
  let component: ArchitectureLandingPageBuilderComponent;
  let fixture: ComponentFixture<ArchitectureLandingPageBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureLandingPageBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchitectureLandingPageBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
