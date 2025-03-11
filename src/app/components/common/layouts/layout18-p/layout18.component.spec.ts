import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout18Component } from './layout18.component';

describe('Layout18Component', () => {
  let component: Layout18Component;
  let fixture: ComponentFixture<Layout18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout18Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
