import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { GeneralServicesService } from '../../../services/general-services.service';
import { ToasterService } from '../../../services/toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { of, throwError } from 'rxjs';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let generalServiceSpy: jasmine.SpyObj<GeneralServicesService>;
  let toasterServiceSpy: jasmine.SpyObj<ToasterService>;
  let spinnerServiceSpy: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(async () => {
    const generalSpy = jasmine.createSpyObj('GeneralServicesService', ['getHomePage', 'postHomePageData', 'deleteLayout']);
    const toasterSpy = jasmine.createSpyObj('ToasterService', ['errorToaster', 'successToaster']);
    const spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    await TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      providers: [
        { provide: GeneralServicesService, useValue: generalSpy },
        { provide: ToasterService, useValue: toasterSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    generalServiceSpy = TestBed.inject(GeneralServicesService) as jasmine.SpyObj<GeneralServicesService>;
    toasterServiceSpy = TestBed.inject(ToasterService) as jasmine.SpyObj<ToasterService>;
    spinnerServiceSpy = TestBed.inject(NgxSpinnerService) as jasmine.SpyObj<NgxSpinnerService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component successfully', fakeAsync(() => {
    const mockData = {
      data: [
        { alt_text: '', description: '', home_id: '1', image_path_blob: '', isImageChange: false, layout_id: '1', title: '', old_home_id: '0' },
        { alt_text: '', description: '', home_id: '2', image_path_blob: '', isImageChange: false, layout_id: '2', title: '', old_home_id: '0' }
      ]
    };
    generalServiceSpy.getHomePage.and.returnValue(of(mockData) as any);

    component.ngOnInit();
    tick();

    expect(spinnerServiceSpy.show).toHaveBeenCalled();
    expect(generalServiceSpy.getHomePage).toHaveBeenCalled();
    expect(spinnerServiceSpy.hide).toHaveBeenCalled();
    expect(component.layouts.length).toBe(2);
  }));

  it('should handle component initialization error', fakeAsync(() => {
    generalServiceSpy.getHomePage.and.returnValue(throwError('Error'));

    component.ngOnInit();
    tick();

    expect(spinnerServiceSpy.show).toHaveBeenCalled();
    expect(generalServiceSpy.getHomePage).toHaveBeenCalled();
    expect(toasterServiceSpy.errorToaster).toHaveBeenCalledWith('Failed to load data');
    expect(spinnerServiceSpy.hide).toHaveBeenCalled();
  }));

  it('should toggle sidebar', () => {
    component.sideBarToogle();

    expect(component.isSideBar).toBeTrue();

    component.sideBarToogle();

    expect(component.isSideBar).toBeFalse();
  });

  // Add more test cases for other methods and functionalities as needed

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
