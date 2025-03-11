import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout10Component } from './layout10.component';

describe('Layout10Component', () => {
  let component: Layout10Component;
  let fixture: ComponentFixture<Layout10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
