import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout14Component } from './layout14.component';

describe('Layout14Component', () => {
  let component: Layout14Component;
  let fixture: ComponentFixture<Layout14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
