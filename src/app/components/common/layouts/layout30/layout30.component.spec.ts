import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout30Component } from './layout30.component';

describe('Layout30Component', () => {
  let component: Layout30Component;
  let fixture: ComponentFixture<Layout30Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout30Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout30Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
