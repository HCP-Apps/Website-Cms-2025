import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout33',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './layout33.component.html',
  styleUrl: './layout33.component.css'
})
export class Layout33Component implements AfterViewInit {
  @Input({ required: true }) layout!: any;
  @Input({ required: true }) id: any;
  @Input({ required: true }) isEdit: any;
  @Output() getFile = new EventEmitter<File>();
  @Output() titleChange = new EventEmitter();
  @Output() descriptionChange = new EventEmitter();
  image!: File;
  imageUrl = environment.image_url_server

  openCropperDialog(event: any) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.getFile.emit(file);
    }
  }

  CustomTitleText(event: any) {
    this.titleChange.emit(event.target.value);
  }

  CustomText(event: any) {
    this.descriptionChange.emit(event.target.value)
  }
  ngAfterViewInit(): void {
    if (this.videoPlayer1) {
      this.videoPlayer1.nativeElement.load();
    }
  }
  @ViewChild('videoPlayer1', { static: false }) videoPlayer1: ElementRef | undefined;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['layout.image']) {
      if (this.videoPlayer1) {
        this.videoPlayer1.nativeElement.load();
      }
    }
  }
}
