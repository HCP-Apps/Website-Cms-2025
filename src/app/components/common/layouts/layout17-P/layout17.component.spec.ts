import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout17Component } from './layout17.component';

describe('Layout17Component', () => {
  let component: Layout17Component;
  let fixture: ComponentFixture<Layout17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout17Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
