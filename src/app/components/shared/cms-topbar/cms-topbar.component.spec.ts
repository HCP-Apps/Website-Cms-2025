import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTopbarComponent } from './cms-topbar.component';

describe('CmsTopbarComponent', () => {
  let component: CmsTopbarComponent;
  let fixture: ComponentFixture<CmsTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTopbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
