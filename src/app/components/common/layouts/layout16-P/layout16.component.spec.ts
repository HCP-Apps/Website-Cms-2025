import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layout16Component } from './layout16.component';

describe('Layout16Component', () => {
  let component: Layout16Component;
  let fixture: ComponentFixture<Layout16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout16Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Layout16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
