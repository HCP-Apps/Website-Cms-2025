import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { Router } from '@angular/router';
import { Layout4Component } from '../../common/layouts/layout4-P/layout4.component';
import { CommonModule } from '@angular/common';
import { LayoutDialogComponent } from '../../common/dialog/layout-dialog/layout-dialog.component';
import { EditLayoutComponent } from '../../common/dialog/edit-layout/edit-layout.component';
import { ArchitectureLandingPageBuilderComponent } from '../../common/page-builder/architecture-landing-page-builder/architecture-landing-page-builder.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Layout12Component } from '../../common/layouts/layout12-P/layout12.component';
import { Layout6Component } from '../../common/layouts/layout6-P/layout6.component';
import { Layout13Component } from '../../common/layouts/layout13-P/layout13.component';
import { Layout15Component } from '../../common/layouts/layout15-P/layout15.component';
import { Layout14Component } from '../../common/layouts/layout14-P/layout14.component';
import { Layout16Component } from '../../common/layouts/layout16-P/layout16.component';
import { Layout18Component } from '../../common/layouts/layout18-p/layout18.component';
import { Layout7Component } from '../../common/layouts/layout7-P/layout7.component';
import { Layout8Component } from '../../common/layouts/layout8-P/layout8.component';
import { Layout17Component } from '../../common/layouts/layout17-P/layout17.component';
import { Layout5Component } from '../../common/layouts/layout5-P/layout5.component';
import { CmsTopbarComponent } from '../../shared/cms-topbar/cms-topbar.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { DeleteLayoutComponent } from '../../common/dialog/delete-layout/delete-layout.component';
import { ToastModule } from 'primeng/toast';
import { GeneralServicesService } from '../../../services/general-services.service';
import { ToasterService } from '../../../services/toaster.service';
import { faPen, faTrash, faUpDown } from '@fortawesome/free-solid-svg-icons';
import { Layout31Component } from '../../common/layouts/layout31/layout31.component';
import { MessageService } from 'primeng/api';
interface FileWithIndex {
  file: File;
  index: number;
}
@Component({
  selector: 'app-urbanism-project-page',
  standalone: true,
  imports: [
    TopbarComponent,
    CommonModule,
    LayoutDialogComponent,
    EditLayoutComponent,
    ArchitectureLandingPageBuilderComponent,
    NgxSpinnerModule,
    Layout4Component,
    Layout12Component,
    Layout6Component,
    Layout13Component,
    Layout15Component,
    Layout14Component,
    Layout16Component,
    Layout18Component,
    Layout7Component,
    Layout8Component,
    Layout17Component,
    Layout5Component,
    Layout31Component,
    CmsTopbarComponent,
    FormsModule,
    FontAwesomeModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    DeleteLayoutComponent,
    ToastModule,
  ],
  providers: [ToasterService, MessageService],
  templateUrl: './urbanism-project-page.component.html',
  styleUrl: './urbanism-project-page.component.css',
})
export class UrbanismProjectPageComponent implements OnInit {
  constructor(
    private service: GeneralServicesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public msgService: ToasterService
  ) {}
  isLoading = true;
  urbanismProjects!: any[];
  draggable: boolean = true;
  faPen = faPen;
  faTrash = faTrash;
  faUpDown = faUpDown;
  isEdit: boolean = true;
  isSideBar: boolean = false;
  isAddLayoutPopupVisible: boolean = false;
  isVisible: boolean = false;
  isEditLayoutVisible: boolean = false;
  addedLayouts: any[] = [];
  selectedLayout: any = null;
  selectedLayoutToDelete: {
    ar_project_image_id: any;
    project_id: any;
    layout_id: any;
    index: any;
  } | null = null;
  selectedLayoutToReplace: { index: any } | null = null;
  layoutArray: any[] = [
    { layout_id: '4', image: '../../../../assets/Layouts/layout4.jpg' },
    // { layout_id: '5', image: '../../../../assets/Layouts/layout5.jpg' },
    { layout_id: '7', image: '../../../../assets/Layouts/layout6.jpg' },
    { layout_id: '14', image: '../../../../assets/Layouts/layout7.jpg' },
    { layout_id: '6', image: '../../../../assets/Layouts/layout12.jpg' },
    { layout_id: '8', image: '../../../../assets/Layouts/layout13.jpg' },
    { layout_id: '10', image: '../../../../assets/Layouts/layout14.jpg' },
    { layout_id: '9', image: '../../../../assets/Layouts/layout15.jpg' },
    { layout_id: '11', image: '../../../../assets/Layouts/layout16.jpg' },
    { layout_id: '15', image: '../../../../assets/Layouts/layout17.jpg' },
    { layout_id: '12', image: '../../../../assets/Layouts/layout18.jpg' },
    { layout_id: '31', image: '../../../../assets/Layouts/layout31.jpg' },
  ];

  ngOnInit(): void {
    this.spinner.show();
    this.service
      .getUrbanismprojectPageData(this.router.url.split('/')[2])
      .subscribe((data) => {
        this.urbanismProjects = data.data;
        this.urbanismProjects.map((i, pIndex: any) => {
          i.layouts.map((a: any, index: any) => {
            a.slider.map((sl: any, slIndex: any) => {
              sl.drawing_captions = this.urbanismProjects
                .at(pIndex)
                ?.layouts.at(index)?.captions[slIndex][0] as any;
            });
          });
        });
        this.toTop();
        this.spinner.hide();
        this.isLoading = false;
      });
  }

  onClickNavigate(id: string) {
    this.router.navigate([id]);
  }

  sideBarToogle() {
    this.isSideBar = !this.isSideBar;
  }

  changeMode() {
    this.isEdit = !this.isEdit;
  }

  openAddLayoutDialog() {
    this.isAddLayoutPopupVisible = !this.isAddLayoutPopupVisible;
  }

  closeEditLayoutDialog() {
    this.isEditLayoutVisible = false;
    this.isAddLayoutPopupVisible = false;
  }

  onLayoutSelected(layoutId: any) {
    const selectedLayout = this.layoutArray.find(
      (layout) => layout.layout_id === layoutId.toString()
    );

    if (selectedLayout) {
      let newLayout: any;
      if (layoutId === '14') {
        newLayout = {
          ar_project_image_id: `${new Date().getTime()}`,
          layout_id: selectedLayout.layout_id,
          project_image: [''],
          slider: [
            {
              image: '../../../../../assets/Layouts/layout7.jpg',
            },
          ],
          captions: [['.']],
        };
      } else {
        newLayout = {
          ar_project_image_id: `${new Date().getTime()}`,
          layout_id: selectedLayout.layout_id,
          project_image: [''],
          slider: [],
          captions: [],
        };
      }

      if (this.urbanismProjects.length > 0) {
        this.urbanismProjects.push({
          layouts: [newLayout],
        });
      }

      this.selectedLayout = null;
      this.closeEditLayoutDialog();
    }
  }

  onFilesSelected(files: File | File[], index: number, layoutId: string) {
    const fileArray = Array.isArray(files) ? files : [files];
    const reader = new FileReader();

    fileArray.forEach((file, fileIndex) => {
      reader.onload = () => {
        const imageUrl = reader.result as string;

        this.urbanismProjects.forEach((project, projectIndex) => {
          project.layouts.forEach((layout: any, layoutIndex: any) => {
            if (layout.layout_id === layoutId) {
              if (projectIndex === index) {
                layout.project_image[0] = imageUrl;
              }
            }
          });
        });
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    });
  }

  onFilesVideoSelected(files: File | File[], index: number, layoutId: string) {
    const fileArray = Array.isArray(files) ? files : [files];
    const reader = new FileReader();
  
    fileArray.forEach((file, fileIndex) => {
      reader.onload = () => {
        const videoUrl = reader.result as string;
  
        // Update the project with the new video URL
        this.urbanismProjects.forEach((project, projectIndex) => {
          project.layouts.forEach((layout: any, layoutIndex: any) => {
            if (layout.layout_id === layoutId) {
              if (projectIndex === index) {
                layout.project_image[0] = videoUrl;  // Update the video URL
              }
            }
          });
        });
  
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    });
  }
  
  onFilesSelectedLayout(
    fileWithIndex: FileWithIndex,
    index: number,
    layoutId: string
  ): void {
    const file = fileWithIndex.file;
    const index1 = fileWithIndex.index;
    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result as string;

      this.urbanismProjects.forEach((project, projectIndex) => {
        project.layouts.forEach((layout: any, layoutIndex: any) => {
          if (layout.layout_id === layoutId) {
            if (projectIndex === index) {
              layout.project_image[index1] = imageUrl;
            }
          }
        });
      });
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  onImageChange(event: any) {
    const { file, index } = event;

    const updatedProject = this.urbanismProjects[index];

    if (updatedProject) {
      const layoutIndex = updatedProject.layouts.findIndex(
        (layout: any) => layout.layout_id === file.layout_id
      );

      if (layoutIndex !== -1) {
        updatedProject.layouts[layoutIndex] = {
          ...updatedProject.layouts[layoutIndex],
          image: file.image,
          drawing_captions: file.drawing_captions,
        };
      }
      this.urbanismProjects = [...this.urbanismProjects];
      this.cdr.detectChanges();
    }
  }

  changeTitle(event: any) {
    this.urbanismProjects[event.index].project_name = event.title;
  }

  changeDescription(event: any) {
    this.urbanismProjects[event.index].project_description = event.description;
  }

  changeYear(event: any) {
    this.urbanismProjects[event.index].project_year = event.year;
  }

  changeClient(event: any) {
    this.urbanismProjects[event.index].project_client = event.client;
  }

  areasChange(event: any, index: number) {
    this.urbanismProjects[index].title = event.value;
  }

  builtupChange(event: any) {
    this.urbanismProjects[event.index].project_built_up_area =
      event.built_up_area;
  }

  onTagsChange(updatedTags: any, index: number) {
    if (Array.isArray(updatedTags)) {
      const tagsString = updatedTags[0];
      if (typeof tagsString === 'string') {
        const tagsArray = tagsString
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);
        this.urbanismProjects[index].tags = tagsArray;
      }
    }
  }

  onPublish() {
    console.log(this.urbanismProjects, 'this.urbanismProjects');
    this.spinner.show();
    let isEmpty: boolean = false;

    // this.service
    //   .postARPojectPageData(this.urbanismProjects)
    //   .subscribe((data) => {
    //     if (data.message === 'success') {
    //       this.msgService.successToaster('Uploaded successfully');
    //       this.spinner.hide();
    //     }
    //   });
  }

  toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
