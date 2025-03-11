import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Homepage } from '../../../../interfaces/homepage';
import { Layout1Component } from '../../layouts/layout1/layout1.component';
import { Layout2Component } from '../../layouts/layout2/layout2.component';
import { LayoutDialogComponent } from '../../dialog/layout-dialog/layout-dialog.component';
import {
  CropperDialogComponent,
  CropperDialogData,
} from '../../dialog/cropper-dialog/cropper-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditLayoutComponent } from '../../dialog/edit-layout/edit-layout.component';
import { faPen, faTrash, faUpDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home-page-builder',
  standalone: true,
  templateUrl: './home-page-builder.component.html',
  styleUrl: './home-page-builder.component.css',
  imports: [
    Layout1Component,
    Layout2Component,
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
  ],
})
export class HomePageBuilderComponent {
  @Input({ required: true }) layouts!: Homepage[];
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
  isCropperVisible: boolean = false;
  faPen = faPen;
  faTrash = faTrash;
  faUpDown = faUpDown;
  data!: CropperDialogData;
  editIndex!: number;
  draggable: boolean = true;

  openAddLayoutDialog() {
    this.AddLayoutDialog.emit()
  }

  openEditLayoutDialog(index: number) {
    this.editIndex = index;
    this.opneEditLayout();
  }

  opneEditLayout() {
    this.EditLayoutDialog.emit()
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
      home_id: this.layouts[index].home_id,
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
    moveItemInArray(this.layouts, event.previousIndex, event.currentIndex);
    let previousHomeId = this.layouts[event.previousIndex].home_id;
    let currentHomeId = this.layouts[event.currentIndex].home_id;
    this.layouts[event.previousIndex].home_id = currentHomeId;
    this.layouts[event.currentIndex].home_id = previousHomeId;
  }
}
