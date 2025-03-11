import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LayoutDialogComponent } from '../../dialog/layout-dialog/layout-dialog.component';
import { CropperDialogComponent, CropperDialogData } from '../../dialog/cropper-dialog/cropper-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditLayoutComponent } from '../../dialog/edit-layout/edit-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Weeklynews } from '../../../pages/press-news/press-news.component';
import { faPen, faTrash, faUpDown } from '@fortawesome/free-solid-svg-icons';
import { Layout4Component } from '../../layouts/layout4-P/layout4.component';
import { CarouselModule } from 'primeng/carousel';
import { Layout33Component } from '../../layouts/layout33/layout33.component';

@Component({
  selector: 'app-press-builder',
  standalone: true,
  imports: [
    LayoutDialogComponent,
    CropperDialogComponent,
    CommonModule,
    FormsModule,
    EditLayoutComponent,
    FontAwesomeModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    Layout4Component,
    Layout33Component,
    CarouselModule
  ],
  templateUrl: './press-builder.component.html',
  styleUrl: './press-builder.component.css',
})
export class PressBuilderComponent {
  @Input({ required: true }) filteredPressData!: any[];
  @Input() currentPressData!: any[];
  @Input({ required: true }) activeIndex!: any;
  @Input({ required: true }) isEdit!: any;
  @Output() addlayout = new EventEmitter<number>();
  @Output() editChangeLayout = new EventEmitter<any>();
  @Output() setImage = new EventEmitter();
  @Output() deleteLayout = new EventEmitter();
  @Output() changeTitle = new EventEmitter();
  @Output() changeDescription = new EventEmitter();
  @Output() changeAltText = new EventEmitter();
  @Output() AddLayoutDialog = new EventEmitter();
  @Output() EditLayoutDialog = new EventEmitter();
  @Input({ required: true }) isAddLayoutVisible!: boolean;
  @Input({ required: true }) isEditLayoutVisible!: boolean;
  @Output() updatePressData = new EventEmitter<Weeklynews>();
  isCropperVisible: boolean = false;
  faPen = faPen;
  faTrash = faTrash;
  faUpDown = faUpDown;
  data!: CropperDialogData;
  editIndex!: number;
  draggable: boolean = true;

  onUpdateLayout(index: any) {
    const updatedLayout = this.filteredPressData[index.page];
    console.log("updatedLayout",this.currentPressData);
    
    this.updatePressData.emit(updatedLayout);
  }
  openAddLayoutDialog() {
    this.AddLayoutDialog.emit();
  }

  openEditLayoutDialog(index: number) {
    this.editIndex = index;
    this.opneEditLayout();
  }

  opneEditLayout() {
    this.EditLayoutDialog.emit();
  }

  changeLayout(index: number, event: any) {
    this.editChangeLayout.emit({ index: index, layout_id: event });
    this.opneEditLayout();
  }

  opneCrooper() {
    this.isCropperVisible = true;
  }

  layoutSelect($event: number) {
    this.addlayout.emit($event);
    this.openAddLayoutDialog();
  }

  getFile($event: File, index: number) {
    this.data = {
      image: $event,
      height: 517,
      width: 1240,
      index: index,
    };
    this.opneCrooper();
  }

  saveCropper(event: any) {
    this.setImage.emit(event);
    this.isCropperVisible = false;
  }

  onDelete(index: number) {
    this.deleteLayout.emit({
      index: index,
      press_id: this.filteredPressData[index].press_id,
    });
  }

  onTitleTextChange(index: number, event: any) {
    this.changeTitle.emit({ index: index, title: event });
  }

  onDescriptionTextChnage(index: number, event: any) {
    this.changeDescription.emit({ index: index, description: event });
  }

  handleAltTextChange(index: number, event: any) {
    this.changeAltText.emit({ index: index, alt_text: event.target.value });
  }

  activeHover() {
    this.draggable = false;
  }

  inactiveHover() {
    this.draggable = true;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.filteredPressData, event.previousIndex, event.currentIndex);
    let previousHomeId = this.filteredPressData[event.previousIndex].press_id;
    let currentHomeId = this.filteredPressData[event.currentIndex].press_id;
    this.filteredPressData[event.previousIndex].press_id = currentHomeId;
    this.filteredPressData[event.currentIndex].press_id = previousHomeId;
  }
}
