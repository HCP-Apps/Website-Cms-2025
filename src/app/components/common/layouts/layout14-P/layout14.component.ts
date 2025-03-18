import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
interface FileWithIndex {
  file: File;
  index: number;
}
@Component({
  selector: 'app-layout14',
  standalone: true,
  imports: [],
  templateUrl: './layout14.component.html',
  styleUrl: './layout14.component.css',
})
export class Layout14Component {
  @Input({ required: true }) id: any;
  @Input({ required: true }) isEdit: any;
  @Input({ required: true }) imageName1!: string | null;
  @Input({ required: true }) imageName2!: string | null;
  @Input({ required: true }) imageName3!: string | null;
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

          if ((index === 0 || index === 1) && width === 949 && height === 529) {
            resolve(true);
          } else if (index === 2 && width === 1920 && height === 529) {
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
            'Invalid image dimensions. The dimensions must be: ' +
              (index === 2 ? '1920 x 529' : '949 x 529')
          );
        });
    }
  }
}
