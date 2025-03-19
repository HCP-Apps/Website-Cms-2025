import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout31Component } from './layout31.component';

describe('Layout31Component', () => {
  let component: Layout31Component;
  let fixture: ComponentFixture<Layout31Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout31Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
