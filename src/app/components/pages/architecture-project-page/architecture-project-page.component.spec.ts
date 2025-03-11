import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureProjectPageComponent } from './architecture-project-page.component';

describe('ArchitectureProjectPageComponent', () => {
  let component: ArchitectureProjectPageComponent;
  let fixture: ComponentFixture<ArchitectureProjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureProjectPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchitectureProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
