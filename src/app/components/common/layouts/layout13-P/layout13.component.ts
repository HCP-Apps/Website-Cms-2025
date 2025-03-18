import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
interface FileWithIndex {
  file: File;
  index: number;
}
@Component({
  selector: 'app-layout13',
  standalone: true,
  imports: [],
  templateUrl: './layout13.component.html',
  styleUrl: './layout13.component.css'
})
export class Layout13Component {
  @Input({ required: true }) id: any;
  @Input({ required: true }) isEdit: any;
  @Input({required: true}) imageName1!: string
  @Input({required: true}) imageName2!: string
  @Input({required: true}) imageName3!: string
  @Input({required: true}) imageName4!: string
  imageUrl = environment.image_url_server

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
  validateImageDimensions(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const { width, height } = img;

          if (width === 949 && height === 529) {
            resolve(true);  
          } else {
            reject('Invalid image dimensions. The image must be 949 x 529 pixels.');
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
      this.validateImageDimensions(file)
        .then(() => {
          this.getFile.emit({ file, index });
        })
        .catch((error) => {
          alert(error);
        });
    }
  }
}
