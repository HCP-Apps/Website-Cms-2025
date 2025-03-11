import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { CoverComponent } from '../../shared/cover/cover.component';
import { CmsTopbarComponent } from '../../shared/cms-topbar/cms-topbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ButtonComponent } from '../../common/button/button.component';
import { HomePageBuilderComponent } from '../../common/page-builder/home-page-builder/home-page-builder.component';
import { Homepage } from '../../../interfaces/homepage';
import { LayoutDialogComponent } from '../../common/dialog/layout-dialog/layout-dialog.component';
import { ToasterService } from '../../../services/toaster.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralServicesService } from '../../../services/general-services.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [
    RouterOutlet,
    ButtonModule,
    TopbarComponent,
    CoverComponent,
    CmsTopbarComponent,
    FooterComponent,
    ButtonComponent,
    HomePageBuilderComponent,
    LayoutDialogComponent,
    HomepageComponent,
    ToastModule,
    NgxSpinnerModule,
  ],
  providers: [ToasterService, MessageService],
})
export class HomepageComponent {
  constructor(
    private service: GeneralServicesService,
    public msgService: ToasterService,
    private spinner: NgxSpinnerService
  ) {}
  layouts: Homepage[] = [];
  isSideBar: boolean = false;
  isEdit: boolean = true;
  isAddLayoutPopupVisible: boolean = false;
  isEditLayoutPopupVisible: boolean = false;

  ngOnInit(): void {
    this.spinner.show();
    this.service.getHomePage().subscribe(( data ) => {
      this.layouts = data.data;
      this.layouts?.map((value) => {
        // Can be improved: conversion should be in php
        value.home_id = parseInt(value.home_id.toString());
        value.layout_id = parseInt(value.layout_id.toString());
        value.old_home_id = parseInt(value.home_id.toString());
      });
      this.spinner.hide();
    });
  }

  sideBarToogle() {
    this.isSideBar = !this.isSideBar;
  }

  changeMode() {
    this.isEdit = !this.isEdit;
  }

  onPublish() {
    this.spinner.show();
    let isEmpty: boolean = false;
    this.layouts.forEach((data) => {
      // To check for empty data in the layouts array for validation
      if (
        // data.alt_text === '' ||
        data.title === '' ||
        data.description === '' 
        // ||
        // data.image_path_blob === ''
      ) {
        isEmpty = true;
        return;
      }
    });

    if (isEmpty) {
      this.msgService.errorToaster('Please fill all the details');
      this.spinner.hide();
    } else {
      this.service.postHomePageData(this.layouts).subscribe((data) => {
        if (data.message === 'success') {
          this.msgService.successToaster('Uploaded successfully');
          this.spinner.hide();
        }
      });
    }
  }

  openAddLayoutDialog() {
    this.isAddLayoutPopupVisible = !this.isAddLayoutPopupVisible;
  }

  openEditLayoutDialog() {
    this.isEditLayoutPopupVisible = !this.isEditLayoutPopupVisible;
  }

  addlayout(event: number) {
    this.layouts.push({
      alt_text: '',
      description: '',
      home_id: 0,
      image_path_blob: '',
      isImageChange: false,
      layout_id: event,
      title: '',
      old_home_id: 0,
      url:''
    });
  }

  setImage(event: any) {
    this.layouts[event.index].image_path_blob = event.imageUrl;
    this.layouts[event.index].isImageChange = true;
  }

  changeTitle(event: any) {
    this.layouts[event.index].title = event.title;
  }

  chnageDescription(event: any) {
    this.layouts[event.index].description = event.description;
  }

  changeAlt(event: any) {
    console.log(event)
    this.layouts[event.index].alt_text = event.alt_text;
  }

  editLayout(event: any) {
    let data: Homepage = {
      alt_text: '',
      description: '',
      home_id: 0,
      image_path_blob: '',
      isImageChange: false,
      layout_id: event.layout_id,
      title: '',
    };
    this.layouts[event.index] = data;
  }

  deleteLayout(event: any) {
    if (window.confirm('Are you sure to delete layout?') === true) {
      this.spinner.show();
      if (event.home_id !== 0) {
        this.service.deleteLayout(event.home_id).subscribe((response) => {
          if (response.message === 'success') {
            this.spinner.hide();
            this.msgService.successToaster('Deleted successfully');
            this.layouts.splice(event.index, 1);
          }
        });
      } else {
        this.msgService.successToaster('Deleted successfully');
        this.layouts.splice(event.index, 1);
        this.spinner.hide();
      }
    }
  }
}
