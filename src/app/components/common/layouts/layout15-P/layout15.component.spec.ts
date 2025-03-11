import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout15Component } from './layout15.component';

describe('Layout15Component', () => {
  let component: Layout15Component;
  let fixture: ComponentFixture<Layout15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout15Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
