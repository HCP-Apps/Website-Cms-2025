import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
interface FileWithIndex {
  file: File;
  index: number;
}
@Component({
  selector: 'app-layout18',
  standalone: true,
  imports: [],
  templateUrl: './layout18.component.html',
  styleUrl: './layout18.component.css',
})
export class Layout18Component {
  @Input({ required: true }) id: any;
  @Input({ required: true }) isEdit: any;
  @Input({ required: true }) imageName1!: string;
  @Input({ required: true }) imageName2!: string;
  imageUrl = environment.image_url_server;

  @Output() getFile = new EventEmitter<FileWithIndex>();
  isBase64(imagePath: string | null): boolean {
    return imagePath ? imagePath.startsWith('data:image/') : false;
  }

  // setImage(event: any, index: number): void {
  //   const input = event.target as HTMLInputElement;
  //   const file = input.files?.[0];

  //   if (file) {
  //     this.getFile.emit({ file, index });
  //   }
  // }
  validateImageDimensions(file: File, index: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const { width, height } = img;

          if (width === 1920 && height === 529) {
            resolve(true);
          } else {
            reject('Invalid image dimensions.');
          }
        };
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  }

  setImage(event: any, index: number): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.validateImageDimensions(file, index)
        .then(() => {
          this.getFile.emit({ file, index });
        })
        .catch((error) => {
          alert(
            'Invalid image dimensions. The dimensions must be: ' + '1920/529'
          );
        });
    }
  }
}
