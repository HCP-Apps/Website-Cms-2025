import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { Homepage } from '../../../../interfaces/homepage';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-layout1',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './layout1.component.html',
  styleUrl: './layout1.component.css',
})
export class Layout1Component  {
  @Input({ required: true }) layout!: Homepage;
  @Input({ required: true }) id: any;
  @Input({ required: true }) isEdit: any;

  @Output() getFile = new EventEmitter<File>();
  @Output() titleChange = new EventEmitter();
  @Output() descriptionChange = new EventEmitter();
  image!: File;
  imageName1!: string ;
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
    console.log(this.layout, "layout")
  }

  CustomText(event: any) {
    this.descriptionChange.emit(event.target.value)
  }

  
}
