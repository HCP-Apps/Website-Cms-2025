import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout9Component } from './layout9.component';

describe('Layout9Component', () => {
  let component: Layout9Component;
  let fixture: ComponentFixture<Layout9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
