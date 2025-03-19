import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-layout4',
  standalone: true,
  imports: [],
  templateUrl: './layout4.component.html',
  styleUrl: './layout4.component.css',
})
export class Layout4Component {
  @Input({ required: true }) id: any;
  @Input({ required: true }) isEdit: any;
  imageUrl = environment.image_url_server;
  @Input({ required: true }) imageName!: any;
  @Output() getFile = new EventEmitter<File>();
  @Output() openCropper = new EventEmitter<Event>();
  
  isBase64(imagePath: string | null): boolean {
    return imagePath ? imagePath.startsWith('data:image/') : false;
  }
  setImage(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();

        img.onload = () => {
          if (img.width === 1920 && img.height === 1080) {
            this.getFile.emit(file);
          } else {
            alert('Please upload an image with dimensions 1920x1080.');
          }
        };

        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

}
