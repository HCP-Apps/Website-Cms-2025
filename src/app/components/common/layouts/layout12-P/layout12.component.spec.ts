import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout12Component } from './layout12.component';

describe('Layout12Component', () => {
  let component: Layout12Component;
  let fixture: ComponentFixture<Layout12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
