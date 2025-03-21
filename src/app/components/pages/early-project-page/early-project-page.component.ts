import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { Router } from '@angular/router';
import { Layout4Component } from '../../common/layouts/layout4-P/layout4.component';
import { CommonModule } from '@angular/common';
import { LayoutDialogComponent } from '../../common/dialog/layout-dialog/layout-dialog.component';
import { EditLayoutComponent } from '../../common/dialog/edit-layout/edit-layout.component';
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
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
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
  selector: 'app-early-project-page',
  standalone: true,
  imports: [
    TopbarComponent,
    CommonModule,
    LayoutDialogComponent,
    EditLayoutComponent,
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
  templateUrl: './early-project-page.component.html',
  styleUrl: './early-project-page.component.css',
})
export class EarlyProjectPageComponent implements OnInit {
  constructor(
      private service: GeneralServicesService,
      private spinner: NgxSpinnerService,
      private router: Router,
      private cdr: ChangeDetectorRef,
      public msgService: ToasterService
    ) {}
    draggable: boolean = true;
    faPen = faPen;
    faTrash = faTrash;
    faUpDown = faUpDown;
    earlyProjects!: any[];
    isEdit: boolean = true;
    isSideBar: boolean = false;
    isAddLayoutPopupVisible: boolean = false;
    isVisible: boolean = false;
    isEditLayoutVisible: boolean = false;
    hasChanges: boolean = false;
    addedLayouts: any[] = [];
    selectedLayout: any = null;
    selectedLayoutToDelete: {
      index:any
    } | any = null;
    selectedLayoutToReplace: { index: any; lp_project_image_id: any } | null =
      null;
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
  // layoutArray: any[] = [
    //   { layout_id: '4', image: './assets/Layouts/layout4.jpg' },
    //   // { layout_id: '5', image: './assets/Layouts/layout5.jpg' },
    //   { layout_id: '7', image: './assets/Layouts/layout6.jpg' },
    //   { layout_id: '14', image: './assets/Layouts/layout7.jpg' },
    //   { layout_id: '6', image: './assets/Layouts/layout12.jpg' },
    //   { layout_id: '8', image: './assets/Layouts/layout13.jpg' },
    //   { layout_id: '10', image: './assets/Layouts/layout14.jpg' },
    //   { layout_id: '9', image: './assets/Layouts/layout15.jpg' },
    //   { layout_id: '11', image: './assets/Layouts/layout16.jpg' },
    //   { layout_id: '15', image: './assets/Layouts/layout17.jpg' },
    //   { layout_id: '12', image: './assets/Layouts/layout18.jpg' },
    //   { layout_id: '31', image: './assets/Layouts/layout31.jpg' },
    // ];
    ngOnInit(): void {
      this.fetchData();
    }
  
    fetchData() {
      this.spinner.show();
      this.service
        .getEarlyprojectPageData(this.router.url.split('/')[2])
        .subscribe((data) => {
          this.earlyProjects = data.data;
          this.earlyProjects.forEach((i, pIndex:any) => {
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
      index?: any
    ) {
      if (index) {
        this.selectedLayoutToDelete = {
          index,
        };
        this.isVisible = !this.isVisible;
      } else {
        this.isVisible = false;
      }
    }
  
    // isTemporaryLayout(lp_project_image_id: string): boolean {
    //   return lp_project_image_id.startsWith('temp-');
    // }
  
    onLayoutDelete() {
      const { index } = this.selectedLayoutToDelete;
      this.spinner.show();
      this.earlyProjects.splice(index, 1);
      this.hasChanges = true;
      this.spinner.hide();
      this.isVisible = false;
    }
  
    onLayoutSelected(layoutId: any) {
      const selectedLayout = this.layoutArray.find(
        (layout) => layout.layout_id === layoutId.toString()
      );
  
      if (selectedLayout) {
        let newLayout: any;
        if (layoutId === '14') {
          newLayout = {
            lp_project_image_id: ``,
            layout_id: selectedLayout.layout_id,
            project_image: [''],
            slider: [
              {
                image: '../../../../../assets/Layouts/layout7.jpg',
                 // image: './../assets/Layouts/layout7.jpg',
              },
            ],
            captions: [['.']],
          };
        } else if (layoutId === '31') {
          newLayout = {
            lp_project_image_id: ``,
            layout_id: selectedLayout.layout_id,
            project_image: ['../../../../../assets/Layouts/layout31.jpg'],
            // project_image: ['./../assets/Layouts/layout31.jpg'],
            slider: [],
            captions: [],
          };
        } else {
          newLayout = {
            lp_project_image_id: ``,
            layout_id: selectedLayout.layout_id,
            project_image: [''],
            slider: [],
            captions: [],
          };
        }
  
        if (this.earlyProjects.length > 0) {
          this.earlyProjects.push({
            layouts: [newLayout],
          });
          this.hasChanges = true;
        }
  
        this.selectedLayout = null;
        this.closeEditLayoutDialog();
      }
    }
      onLayoutReplaceSelected(event: any) {
        if (this.selectedLayoutToReplace) {
          const { index, lp_project_image_id } = this.selectedLayoutToReplace;
    
          const selectedLayout = this.layoutArray.find(
            (layout) => layout.layout_id === event
          );
          if (selectedLayout.layout_id === '14') {
            this.earlyProjects[index].layouts = [
              {
                lp_project_image_id: lp_project_image_id,
                layout_id: selectedLayout.layout_id,
                project_image: [],
                slider: [
                  {
                    image: '../../../../../assets/Layouts/layout7.jpg',
                    // image: './../assets/Layouts/layout7.jpg',
                  },
                ],
                captions: [],
              },
            ];
          } else if (selectedLayout.layout_id === '31') {
            this.earlyProjects[index].layouts = [
              {
                lp_project_image_id: lp_project_image_id,
                layout_id: selectedLayout.layout_id,
                project_image: ['../../../../../assets/Layouts/layout31.jpg'],
                // project_image: ['./../assets/Layouts/layout31.jpg'],
                slider: [],
                captions: [],
              },
            ];
          } else {
            this.earlyProjects[index].layouts = [
              {
                lp_project_image_id: lp_project_image_id,
                layout_id: selectedLayout.layout_id,
                project_image: [],
                slider: [],
                captions: [],
              },
            ];
          }
          this.hasChanges = true;
        }
        this.closeEditLayoutDialog();
      }
    
      onFilesVideoSelected(files: File | File[], index: number, layoutId: string) {
        const fileArray = Array.isArray(files) ? files : [files];
        const reader = new FileReader();
    
        fileArray.forEach((file, fileIndex) => {
          reader.onload = () => {
            const videoUrl = reader.result as string;
    
            // Update the project with the new video URL
            this.earlyProjects.forEach((project, projectIndex) => {
              project.layouts.forEach((layout: any, layoutIndex: any) => {
                if (layout.layout_id === layoutId) {
                  if (projectIndex === index) {
                    layout.project_image[0] = videoUrl;
                    this.hasChanges = true;
                  }
                }
              });
            });
    
            this.cdr.detectChanges();
          };
          reader.readAsDataURL(file);
        });
      }
    
      openEditLayoutDialog(index?: any) {
        const lp_project_image_id =
          this.earlyProjects[index].layouts[0].lp_project_image_id;
    
        this.selectedLayoutToReplace = {
          index,
          lp_project_image_id,
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
    
            this.earlyProjects.forEach((project, projectIndex) => {
              project.layouts.forEach((layout: any, layoutIndex: any) => {
                if (layout.layout_id === layoutId) {
                  if (projectIndex === index) {
                    layout.project_image[0] = imageUrl;
                    this.hasChanges = true;
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
    
          this.earlyProjects.forEach((project, projectIndex) => {
            project.layouts.forEach((layout: any, layoutIndex: any) => {
              if (layout.layout_id === layoutId) {
                if (projectIndex === index) {
                  layout.project_image[index1] = imageUrl;
                  this.hasChanges = true;
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
    
        const updatedProject = this.earlyProjects[index];
    
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
          this.hasChanges = true;
          this.earlyProjects = [...this.earlyProjects];
          this.cdr.detectChanges();
        }
      }
    
      changeTitle(event: any) {
        this.hasChanges = true;
        this.earlyProjects[event.index].project_name = event.title;
      }
    
      changeDescription(event: any) {
        this.hasChanges = true;
        this.earlyProjects[event.index].project_description =
          event.description.replace(/Â/g, '');
      }
    
      changeYear(event: any) {
        this.hasChanges = true;
        this.earlyProjects[event.index].project_year = event.year;
      }
    
      changeClient(event: any) {
        this.hasChanges = true;
        this.earlyProjects[event.index].project_client = event.client;
      }
    
      areasChange(event: any, index: number) {
        this.hasChanges = true;
        this.earlyProjects[index].title = event.value;
      }
    
      builtupChange(event: any) {
        this.hasChanges = true;
        this.earlyProjects[event.index].project_built_up_area =
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
            this.hasChanges = true;
            this.earlyProjects[index].tags = tagsArray;
          }
        }
      }
    
      onPublish() {
        console.log(this.earlyProjects, 'this.earlyProjects');
        this.hasChanges = false;
        this.spinner.show();
    
        this.service
          .postERPojectPageData(this.earlyProjects)
          .subscribe((data) => {
            if (data.message === 'success') {
              this.msgService.successToaster('Uploaded successfully');
              this.fetchData();
              this.spinner.hide();
            }
          });
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
          this.earlyProjects,
          event.previousIndex,
          event.currentIndex
        );
      }
}
