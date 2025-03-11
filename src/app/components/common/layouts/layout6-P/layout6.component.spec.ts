import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout6Component } from './layout6.component';

describe('Layout6Component', () => {
  let component: Layout6Component;
  let fixture: ComponentFixture<Layout6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
