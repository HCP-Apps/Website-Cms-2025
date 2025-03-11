import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Homepage } from '../../../../interfaces/homepage';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-layout2',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './layout2.component.html',
  styleUrl: './layout2.component.css',
})
export class Layout2Component {
  @Input({ required: true }) layout!: Homepage;
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

}
