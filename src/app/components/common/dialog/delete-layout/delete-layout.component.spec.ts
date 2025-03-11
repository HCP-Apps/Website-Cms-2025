import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLayoutComponent } from './delete-layout.component';

describe('DeleteLayoutComponent', () => {
  let component: DeleteLayoutComponent;
  let fixture: ComponentFixture<DeleteLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
