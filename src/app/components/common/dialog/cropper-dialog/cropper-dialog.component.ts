export type CropperDialogData = {
  image: File | undefined;
  width: number;
  height: number;
  index : number
};

export type CropperDialogResult = {
  blob: Blob | undefined;
  imageUrl: string;
  index : number
};
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cropper-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ImageCropperModule,
  ],
  templateUrl: './cropper-dialog.component.html',
  styleUrl: './cropper-dialog.component.css',
})
export class CropperDialogComponent {
  @Input({required: true}) data!: CropperDialogData;
  @Input({required: true}) isVisible!: boolean;
  @Output() saveCrop = new EventEmitter()
  newResult : CropperDialogResult | undefined 

  imageCropped(event: ImageCroppedEvent) {
    const { blob, objectUrl } = event;
    console.log(blob)
    // this.isLoading = true;
    if (blob && objectUrl) {
      // Convert Blob URL to base64
      blobToBase64(objectUrl)
        .then((base64String) => {
          console.log(base64String);
          // Set result with blob and base64 image URL
          this.newResult = {blob, imageUrl: base64String, index: this.data.index}
          console.log(this.newResult.blob)
          // this.isLoading = false;
        })
        .catch((error) => {
          // console.error('Error:', error);
          // this.isLoading = false;
        });
    }
  }

  saveResult() {
    this.saveCrop.emit(this.newResult)
  }
}

async function blobToBase64(blobUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error('Failed to fetch image'));
    };
    xhr.open('GET', blobUrl);
    xhr.responseType = 'blob';
    xhr.send();
  });
}