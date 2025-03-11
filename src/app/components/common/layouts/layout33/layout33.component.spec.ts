import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout33Component } from './layout33.component';

describe('Layout33Component', () => {
  let component: Layout33Component;
  let fixture: ComponentFixture<Layout33Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout33Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout33Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
