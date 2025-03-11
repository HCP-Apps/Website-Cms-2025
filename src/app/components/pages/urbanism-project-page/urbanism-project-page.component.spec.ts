import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanismProjectPageComponent } from './urbanism-project-page.component';

describe('UrbanismProjectPageComponent', () => {
  let component: UrbanismProjectPageComponent;
  let fixture: ComponentFixture<UrbanismProjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrbanismProjectPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UrbanismProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
