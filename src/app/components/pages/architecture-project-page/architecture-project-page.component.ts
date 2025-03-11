interface FileWithIndex {
  file: File;
  index: number;
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { Layout4Component } from '../../common/layouts/layout4-P/layout4.component';
import { ArchitectureLandingPageBuilderComponent } from '../../common/page-builder/architecture-landing-page-builder/architecture-landing-page-builder.component';
import { GeneralServicesService } from '../../../services/general-services.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
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
import { LayoutDialogComponent } from '../../common/dialog/layout-dialog/layout-dialog.component';
import { EditLayoutComponent } from '../../common/dialog/edit-layout/edit-layout.component';
import { CmsTopbarComponent } from '../../shared/cms-topbar/cms-topbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faPen, faTrash, faUpDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { DeleteLayoutComponent } from '../../common/dialog/delete-layout/delete-layout.component';

@Component({
  selector: 'app-architecture-project-page',
  standalone: true,
  templateUrl: './architecture-project-page.component.html',
  styleUrl: './architecture-project-page.component.css',
  imports: [
    TopbarComponent,
    Layout4Component,
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
    CmsTopbarComponent,
    FormsModule,
    FontAwesomeModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    DeleteLayoutComponent,
  ],
})
export class ArchitectureProjectPageComponent implements OnInit {
  constructor(
    private service: GeneralServicesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  draggable: boolean = true;
  faPen = faPen;
  faTrash = faTrash;
  faUpDown = faUpDown;
  architectureProjects!: any[];
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
  ];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.spinner.show();
    this.service
      .getArchitectureprojectPageData(this.router.url.split('/')[2])
      .subscribe((data) => {
        this.architectureProjects = data.data;
        this.architectureProjects.map((i, pIndex) => {
          i.layouts.map((a: any, layoutIndex: any) => {
            a.slider.map((sl: any, slIndex: any) => {
              const caption = a.captions[slIndex] ? a.captions[slIndex][0] : '';
              sl.drawing_captions = caption;
            });
          });
        });
        this.spinner.hide();
      });
  }
  

  openDeleteLayoutDialog(
    ar_project_image_id?: any,
    project_id?: any,
    layout_id?: any,
    index?: any
  ) {
    if (ar_project_image_id && project_id && layout_id) {
      this.selectedLayoutToDelete = {
        ar_project_image_id,
        project_id,
        layout_id,
        index,
      };
      this.isVisible = !this.isVisible;
    } else {
      this.isVisible = false;
    }
  }

  isTemporaryLayout(ar_project_image_id: string): boolean {
    return ar_project_image_id.startsWith('temp-');
  }

  onLayoutDelete() {
    if (this.selectedLayoutToDelete) {
      const { ar_project_image_id, project_id, layout_id, index } =
        this.selectedLayoutToDelete;
      this.spinner.show();
      this.architectureProjects.splice(index, 1);
    }
    this.spinner.hide();
    this.isVisible = false;
  }

  // onLayoutSelected(layoutId: number) {
  //   const selectedLayout = this.layoutArray.find(
  //     (layout) => layout.layout_id === layoutId
  //   );

  //   if (selectedLayout) {
  //     const newLayout = {
  //       ar_project_image_id: `temp-${new Date().getTime()}`,
  //       layout_id: selectedLayout.layout_id,
  //       project_image: [],
  //       slider: [],
  //       captions: [],
  //     };

  //     if (this.architectureProjects.length > 0) {
  //       this.architectureProjects.push({
  //         layouts: [newLayout],
  //       });
  //     }

  //     this.selectedLayout = null;
  //     this.closeEditLayoutDialog();
  //   }
  // }
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
          project_image: [""],
          slider: [
            {
              image: "../../../../../assets/Layouts/layout7.jpg"  
            }
          ],
          captions: [
            [
              "." 
            ]
          ]
        };
      } else {
        newLayout = {
          ar_project_image_id: `${new Date().getTime()}`,
          layout_id: selectedLayout.layout_id,
          project_image: [""], 
          slider: [],
          captions: []
        };
      }
  
      if (this.architectureProjects.length > 0) {
        this.architectureProjects.push({
          layouts: [newLayout],
        });
      }
  
      this.selectedLayout = null;
      this.closeEditLayoutDialog();
    }
  }
  
  onLayoutReplaceSelected(event: any) {
    if (this.selectedLayoutToReplace) {
      const { index } = this.selectedLayoutToReplace;
      
      const selectedLayout = this.layoutArray.find(
        (layout) => layout.layout_id === event
      );
      if (selectedLayout) {
        this.architectureProjects[index].layouts = [
          {
            ar_project_image_id: `temp-${new Date().getTime()}`,
            layout_id: selectedLayout.layout_id,
            project_image: [],
            slider: [],
            captions: []
          }
        ];
      }
    }
    this.closeEditLayoutDialog();
  }
  
  openEditLayoutDialog(index?: any) {
    this.selectedLayoutToReplace = {
      index,
    };
    this.isEditLayoutVisible = !this.isEditLayoutVisible;
  }

  closeEditLayoutDialog() {
    this.isEditLayoutVisible = false;
    this.isAddLayoutPopupVisible = false;
  }

  changeMode() {
    this.isEdit = !this.isEdit;
  }
  openAddLayoutDialog() {
    this.isAddLayoutPopupVisible = !this.isAddLayoutPopupVisible;
  }

  onClickNavigate(id: string) {
    this.router.navigate([id]);
  }

  onFilesSelected(files: File | File[], index: number, layoutId: string) {
    const fileArray = Array.isArray(files) ? files : [files];
    const reader = new FileReader();

    fileArray.forEach((file, fileIndex) => {
      reader.onload = () => {
        const imageUrl = reader.result as string;

        this.architectureProjects.forEach((project, projectIndex) => {
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

      this.architectureProjects.forEach((project, projectIndex) => {
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

    const updatedProject = this.architectureProjects[index];

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
      this.architectureProjects = [...this.architectureProjects];
      this.cdr.detectChanges();
    }
  }

  changeTitle(event: any) {
    this.architectureProjects[event.index].project_name = event.title;
  }
  changeDescription(event: any) {
    this.architectureProjects[event.index].project_description =
      event.description;
  }
  changeYear(event: any) {
    this.architectureProjects[event.index].project_year = event.year;
  }
  changeClient(event: any) {
    this.architectureProjects[event.index].project_client = event.client;
  }
  areasChange(event: any, index: number) {
    this.architectureProjects[index].area = event.value;
  }

  builtupChange(event: any) {
    this.architectureProjects[event.index].project_built_up_area =
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
        this.architectureProjects[index].tags = tagsArray;
      }
    }
  }

  onPublish() {
    console.log(this.architectureProjects, 'this.architectureProjects');
    // this.spinner.show();
    // let isEmpty: boolean = false;

    // this.service.postHomePageData(this.layouts).subscribe((data) => {
    //   if (data.message === 'success') {
    //     this.msgService.successToaster('Uploaded successfully');
    //     this.spinner.hide();
    //   }
    // });
  }
  sideBarToogle() {
    this.isSideBar = !this.isSideBar;
  }

  activeHover() {
    this.draggable = false;
  }

  inactiveHover() {
    this.draggable = true;
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.architectureProjects,
      event.previousIndex,
      event.currentIndex
    );
  }
}
