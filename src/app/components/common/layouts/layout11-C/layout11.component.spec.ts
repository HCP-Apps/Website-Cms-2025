import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout11Component } from './layout11.component';

describe('Layout11Component', () => {
  let component: Layout11Component;
  let fixture: ComponentFixture<Layout11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
