import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CmsTopbarComponent } from '../../shared/cms-topbar/cms-topbar.component';
import { GeneralServicesService } from '../../../services/general-services.service';
import { Router } from '@angular/router';
import { Layout11Component } from '../../common/layouts/layout11-C/layout11.component';
import { Layout10Component } from '../../common/layouts/layout10-C/layout10.component';
import { Layout9Component } from '../../common/layouts/layout9-C/layout9.component';
import { Layout30Component } from '../../common/layouts/layout30/layout30.component';

@Component({
  selector: 'app-architecture-landing-page',
  standalone: true,
  templateUrl: './architecture-landing-page.component.html',
  styleUrl: './architecture-landing-page.component.css',
  imports: [
    TopbarComponent,
    NgxSpinnerModule,
    CmsTopbarComponent,
    Layout9Component,
    Layout10Component,
    Layout11Component,
    Layout30Component,
  ],
})
export class ArchitectureLandingPageComponent implements OnInit {
  constructor(
    private service: GeneralServicesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}
  architectureLayouts: any[] = [];
  customGap: string = '';
  isEdit: boolean = true; // Mode
  isSideBar: boolean = false;
  data!:any

  ngOnInit(): void {
    this.customGap = (23 * window.innerWidth) / 1920 + 'px';
    this.fetchData();
  }
  fetchData(): void {
    this.service.getArchitectureLandingPageData().subscribe(
      (response) => {
        this.architectureLayouts = response.data; // Initialize layouts
        this.spinner.hide();
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching architecture page data:', error);
        this.spinner.hide();
        this.cdr.detectChanges();
      }
    );
  }

  onImageUpload(event: any, layoutIndex: number, imageIndex: number): void {
    console.log("imageIndex",imageIndex);
    
    const file = event.file;
    console.log(file);
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Update only the specified image
        this.architectureLayouts[layoutIndex].images[imageIndex] = {
          ar_image_path: e.target.result, 
          ar_project_name: this.architectureLayouts[layoutIndex].images[imageIndex]?.ar_project_name,
          ar_project_id: this.architectureLayouts[layoutIndex].images[imageIndex]?.ar_project_id,
        };
        console.log('Updated layout:', this.architectureLayouts[layoutIndex]);
      };
      reader.readAsDataURL(file);  // Read the image as a Data URL
    }
  }
  
  
  

  onTitleChange(event: { layoutIndex: number, projectId: string, newTitle: string }): void {
    const { layoutIndex, projectId, newTitle } = event;
  
    const layout = this.architectureLayouts[layoutIndex];
  
    const image = layout.images.find((img:any) => img.ar_project_id === projectId);
    if (image) {
      image.ar_project_name = newTitle;
    }
  }
  
  

  // Handle image deletion
  deleteImage(layoutIndex: number, imageIndex: number): void {
    this.architectureLayouts[layoutIndex].images[imageIndex] = null; // Remove the image
  }

  // Handle layout change (add/remove)
  addLayout(newLayout: any): void {
    this.architectureLayouts.push(newLayout); // Add a new layout
  }

  removeLayout(layoutIndex: number): void {
    this.architectureLayouts.splice(layoutIndex, 1); // Remove the layout
  }

  sideBarToogle() {
    this.isSideBar = !this.isSideBar;
  }
  changeMode() {
    this.isEdit = !this.isEdit;
  }
  getFile($event: any, index: number) {
    console.log("event",$event);
    
    this.data = {
      image: $event,
      index: index,
    };
  }

  onPublish() {
    this.spinner.show();
    let isEmpty: boolean = false;

    if (isEmpty) {
      //   this.msgService.errorToaster('Please fill all the details');
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
  navigateUrl(url: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      // Navigate back to the original URL
      this.router.navigateByUrl(url);
    });
  }
}
