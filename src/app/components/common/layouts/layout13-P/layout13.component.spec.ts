import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout13Component } from './layout13.component';

describe('Layout13Component', () => {
  let component: Layout13Component;
  let fixture: ComponentFixture<Layout13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
