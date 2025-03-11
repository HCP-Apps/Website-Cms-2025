export interface Weeklynews {
  press_id: number;
  layout_id: any;
  image_path_blob: string;
  description: string;
  title: string;
  alt_text: string;
  isImageChange: boolean;
  old_press_id?: number;
}

export interface WeeklynewsData {
  data: Weeklynews[];
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { CoverComponent } from '../../shared/cover/cover.component';
import { CmsTopbarComponent } from '../../shared/cms-topbar/cms-topbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ButtonComponent } from '../../common/button/button.component';
import { LayoutDialogComponent } from '../../common/dialog/layout-dialog/layout-dialog.component';
import { ToasterService } from '../../../services/toaster.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralServicesService } from '../../../services/general-services.service';
import { PressBuilderComponent } from '../../common/page-builder/press-builder/press-builder.component';
import { environment } from '../../../../environments/environment.development';
import {
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe, JsonPipe } from '@angular/common';
import {
  CustomDateAdapter,
  WeekRangeSelectionStrategy,
} from '../../common/page-builder/press-builder/custom-date-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-press-news',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    DatePipe,
    ToasterService,
    MessageService,
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: WeekRangeSelectionStrategy,
    },
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
    },
  ],
  imports: [
    RouterOutlet,
    ButtonModule,
    TopbarComponent,
    CoverComponent,
    CmsTopbarComponent,
    FooterComponent,
    ButtonComponent,
    LayoutDialogComponent,
    ToastModule,
    NgxSpinnerModule,
    PressBuilderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    JsonPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './press-news.component.html',
  styleUrl: './press-news.component.css',
})
export class PressNewsComponent {
  constructor(
    private service: GeneralServicesService,
    public msgService: ToasterService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {}
  isSideBar: boolean = false;
  isAddLayoutPopupVisible: boolean = false;
  isEditLayoutPopupVisible: boolean = false;
  imageUrl = environment.image_url_server;
  pressLayouts: any[] = [];
  isEdit: boolean = true; // Mode
  isLoading = true;
  others: any;
  pressDescription: any;
  minDate = new Date(2024, 8, 23);
  maxDate: any;
  selectedDate: Date | any = null;
  currentPressData: any;
  filteredPressData: any[] = [];
  activeIndex = 0;
  selectStartWeek:any;
  selectEndWeek:any;
  blockDates: any
  blockdates: Date[] = []; 
  minSelectableDate: Date = new Date(2024, 8, 23); 
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  myFilter = (d: any | null): boolean => {
    const day = d || new Date();

    // const blockedRanges = [
    //   { start: new Date(2024, 10, 1), end: new Date(2024, 10, 10) },
    //   { start: new Date(2024, 9, 28), end: new Date(2024, 9, 31) },
    //   { start: new Date(2025, 0, 6), end: new Date(2025, 0, 12) },
    // ];
    const blockedRanges = this.blockDates.map((item: any) => ({
      start: new Date(item.from_date_year, item.from_date_month - 1, item.from_date_day), 
      end: new Date(item.to_date_year, item.to_date_month - 1, item.to_date_day) 
    }));
  

    for (const range of blockedRanges) {
      if (d >= range.start && d <= range.end) {
        return false;
      }
    }

    return true;
  };
  ngOnInit(): void {
    this.range.valueChanges.subscribe((value) => {
      const { start, end } = value;
      this.selectStartWeek = start
      this.selectEndWeek = end
    });
  
    this.spinner.show();
    this.service.getWeeklyDate().subscribe((response) => {
      this.blockDates = response.weekly_block_dates
      this.maxDate = new Date(
        response.max_week_last_year,
        response.max_week_last_month,
        response.max_week_last_day
      );
    });
    this.service.getPress().subscribe(
      (data) => {
        const pressData = data.data;
        const worker = new Worker(
          new URL('../../../press.worker', import.meta.url)
        );

        worker.onmessage = ({ data: processedData }) => {
          this.pressLayouts = processedData || [];
          this.filteredPressData = this.pressLayouts;
          // const maxPressIdItem = this.filteredPressData.reduce(
          //   (max: any, item: any) => {
          //     console.log("this.activeIndex",item.press_id > max.press_id ? item : max);
          //     // return item.press_id >= max.press_id ? item : max;
          //     return item.press_id - 1 > max.press_id ? item : max
          //   },
          //   this.filteredPressData[0]
          // );
          const maxPressIdItem = this.filteredPressData.reduce(
            (max: any, item: any) => {
              const itemPressId = Number(item.press_id);
              const maxPressId = Number(max.press_id);

              return itemPressId > maxPressId ? item : max;
            },
            this.filteredPressData[0]
          );

          const maxPressIndex = this.filteredPressData.find(
            (item: any) => item.press_id === maxPressIdItem.press_id
          );
          this.activeIndex = maxPressIndex.press_id;

          setTimeout(() => {
            const carousel = document.querySelector('.press-slider');
            if (carousel) {
              carousel.classList.add('loaded');
            }
          }, 300);

          this.currentPressData =
            this.filteredPressData.length > 0
              ? this.filteredPressData[0].data11
              : [];
          this.isLoading = false;
          this.spinner.hide();
          this.cdr.detectChanges();
        };

        worker.onerror = (error) => {
          console.error('Worker error:', error);
          this.spinner.hide();
        };
        worker.postMessage(pressData);
      },
      (error) => {
        console.error('Error fetching press data:', error);
        this.spinner.hide();
      }
    );
  }

  // Filter the data based on selected date
  updateFilteredPressData() {
    if (this.selectedDate) {
      const selectedDate = new Date(this.selectedDate);
      selectedDate.setHours(0, 0, 0, 0);
      const selectedDateData: any[] = [];
      const futureData: any[] = [];
      const pastData: any[] = [];

      this.pressLayouts.forEach((layout: any) => {
        const fromDate = new Date(
          layout.from_dt.split('-').reverse().join('-')
        );
        const toDate = new Date(layout.to_dt.split('-').reverse().join('-'));
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(0, 0, 0, 0);

        if (selectedDate >= fromDate && selectedDate <= toDate) {
          selectedDateData.push(layout);
        } else if (selectedDate < fromDate) {
          futureData.push(layout);
        } else {
          pastData.push(layout);
        }
      });

      futureData.sort((a: any, b: any) => {
        const dateA = new Date(
          a.from_dt.split('-').reverse().join('-')
        ).getTime();
        const dateB = new Date(
          b.from_dt.split('-').reverse().join('-')
        ).getTime();
        return dateA - dateB;
      });

      pastData.sort((a: any, b: any) => {
        const dateA = new Date(
          a.from_dt.split('-').reverse().join('-')
        ).getTime();
        const dateB = new Date(
          b.from_dt.split('-').reverse().join('-')
        ).getTime();
        return dateB - dateA;
      });

      this.filteredPressData = [
        ...selectedDateData,
        ...futureData,
        ...pastData.reverse(),
      ];

      this.activeIndex = 0;
      this.currentPressData =
        this.filteredPressData.length > 0
          ? this.filteredPressData[0].data11 || []
          : [];
    } else {
      this.filteredPressData = this.pressLayouts;
      this.currentPressData =
        this.filteredPressData.length > 0
          ? this.filteredPressData[0].data11 || []
          : [];
    }
    this.cdr.detectChanges();
  }

  updateCurrentPressData(index: any) {
    const page = index.page;
    if (this.filteredPressData[page]) {
      this.currentPressData = this.filteredPressData[page].data11 || [];
      this.activeIndex = page;
      this.cdr.detectChanges();
    }
  }

  sideBarToogle() {
    this.isSideBar = !this.isSideBar;
  }

  changeMode() {
    this.isEdit = !this.isEdit;
  }
  SubmitDate() {
    const startDate = new Date(this.selectStartWeek);
    const endDate = new Date(this.selectEndWeek);
  
    const formattedStartDate = `${startDate.getFullYear()}/${(startDate.getMonth() + 1).toString().padStart(2, '0')}/${startDate.getDate().toString().padStart(2, '0')}`;
    const formattedEndDate = `${endDate.getFullYear()}/${(endDate.getMonth() + 1).toString().padStart(2, '0')}/${endDate.getDate().toString().padStart(2, '0')}`;
    const formattedBlockDates = this.blockdates.map(date => {
      const blockDate = new Date(date);
      return `${blockDate.getFullYear()}/${(blockDate.getMonth() + 1).toString().padStart(2, '0')}/${blockDate.getDate().toString().padStart(2, '0')}`;
    });
    console.log(formattedStartDate, formattedEndDate, "selectEndWeek",formattedBlockDates);
  }
  
  
  onPublish() {
    this.spinner.show();
    let isEmpty: boolean = false;
    this.pressLayouts.forEach((data) => {
      // To check for empty data in the layouts array for validation
      if (
        data.alt_text === '' ||
        data.title === '' ||
        data.description === '' ||
        data.image_path_blob === ''
      ) {
        isEmpty = true;
        return;
      }
    });

    if (isEmpty) {
      this.msgService.errorToaster('Please fill all the details');
      this.spinner.hide();
    } else {
      // this.service.postHomePageData(this.layouts).subscribe((data) => {
      //   if (data.message === 'success') {
      //     this.msgService.successToaster('Uploaded successfully');
      //     this.spinner.hide();
      //   }
      // });
    }
  }

  openAddLayoutDialog() {
    this.isAddLayoutPopupVisible = !this.isAddLayoutPopupVisible;
  }

  openEditLayoutDialog() {
    this.isEditLayoutPopupVisible = !this.isEditLayoutPopupVisible;
  }
  addlayout(layoutId: number) {
    console.log('Add layout with ID:', layoutId);
    // Add layout logic
    this.pressLayouts.push({
      layout_id: layoutId,
      data: {}, // Add appropriate layout data
    });
    this.updateFilteredPressData();
  }
  // addlayout(event: number) {
  //   this.layouts.push({
  //     alt_text: '',
  //     description: '',
  //     press_id: 0,
  //     image_path_blob: '',
  //     isImageChange: false,
  //     layout_id: event,
  //     title: '',
  //     old_press_id: 0,
  //   });
  // }
  setImage(event: any) {
    console.log("setImage",event);
    
    this.pressLayouts[event.index].image_path_blob = event.imageUrl;
    this.pressLayouts[event.index].isImageChange = true;
  }
  changeTitle(event: any) {
    const { index, title } = event;
    console.log('Change title at index:', index, 'to:', title);
    this.pressLayouts[index].title = title;
    this.updateFilteredPressData();
  }
  // changeTitle(event: any) {
  //   this.layouts[event.index].title = event.title;
  // }
  chnageDescription(event: any) {
    const { index, description } = event;
    console.log('Change description at index:', index, 'to:', description);
    this.pressLayouts[index].description = description;
    this.updateFilteredPressData();
  }

  // chnageDescription(event: any) {
  //   this.layouts[event.index].description = event.description;
  // }

  changeAlt(event: any) {
    const { index, alt_text } = event;
    console.log('Change alt text at index:', index, 'to:', alt_text);
    this.pressLayouts[index].alt_text = alt_text;
    this.updateFilteredPressData();
  }

  // changeAlt(event: any) {
  //   console.log(event)
  //   this.layouts[event.index].alt_text = event.alt_text;
  // }
  editLayout(event: any) {
    const { index, layout_id } = event;
    console.log('Edit layout at index:', index, 'with layout ID:', layout_id);
    this.pressLayouts[index].layout_id = layout_id;
    this.updateFilteredPressData();
  }
  // editLayout(event: any) {
  //   let data: Weeklynews = {
  //     alt_text: '',
  //     description: '',
  //     press_id: 0,
  //     image_path_blob: '',
  //     isImageChange: false,
  //     layout_id: event.layout_id,
  //     title: '',
  //   };
  //   this.layouts[event.index] = data;
  // }

  // deleteLayout(event: any) {
  //   if (window.confirm('Are you sure to delete layout?') === true) {
  //     this.spinner.show();
  //     if (event.press_id !== 0) {
  //       this.service.deleteLayout(event.press_id).subscribe((response) => {
  //         if (response.message === 'success') {
  //           this.msgService.successToaster('Deleted successfully');
  //           this.layouts.splice(event.index, 1);
  //           this.spinner.hide();
  //         }
  //       });
  //     } else {
  //       this.msgService.successToaster('Deleted successfully');
  //       this.layouts.splice(event.index, 1);
  //       this.spinner.hide();
  //     }
  //   }
  // }
  deleteLayout(event: any) {
    const { index, press_id } = event;
    console.log('Delete layout at index:', index, 'with press ID:', press_id);
    this.pressLayouts.splice(index, 1);
    this.updateFilteredPressData();
  }
}
