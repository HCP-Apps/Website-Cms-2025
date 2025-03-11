import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageBuilderComponent } from './home-page-builder.component';

describe('HomePageBuilderComponent', () => {
  let component: HomePageBuilderComponent;
  let fixture: ComponentFixture<HomePageBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
