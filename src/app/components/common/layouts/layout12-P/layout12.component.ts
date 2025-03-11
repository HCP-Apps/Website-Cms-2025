import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

interface FileWithIndex {
  file: File;
  index: number;
}

@Component({
  selector: 'app-layout12',
  standalone: true,
  imports: [],
  templateUrl: './layout12.component.html',
  styleUrls: ['./layout12.component.css']
})
export class Layout12Component {
  @Input({ required: true }) id: any;
  @Input({ required: true }) isEdit: any;
  @Input() imageName1!: string;
  @Input() imageName2!: string;
  @Input() imageName3!: string;

  @Output() getFile = new EventEmitter<FileWithIndex>();

  imageUrl = environment.image_url_server;

  isBase64(imagePath: string | null): boolean {
    return imagePath ? imagePath.startsWith('data:image/') : false;
  }

  setImage(event: any, index: number): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (file) {
      this.getFile.emit({ file, index });
    }
  }
  // validateImageDimensions(file: File, index: number): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onload = (e: any) => {
  //       const img = new Image();
  //       img.onload = () => {
  //         const { width, height } = img;
          
  //         if (index === 1 && width === 949 && height === 1080) {
  //           resolve(true);  
  //         } else if ((index === 0 || index === 2) && width === 949 && height === 529) {
  //           resolve(true); 
  //         } else {
  //           reject('Invalid image dimensions.');
  //         }
  //       };
  //       img.src = e.target.result;
  //     };

  //     reader.readAsDataURL(file); 
  //   });
  // }

  // setImage(event: any, index: number): void {
  //   const input = event.target as HTMLInputElement;
  //   const file = input.files?.[0];
    
  //   if (file) {
  //     this.validateImageDimensions(file, index)
  //       .then(() => {
  //         this.getFile.emit({ file, index });
  //       })
  //       .catch((err) => {
  //         alert(err);
  //       });
  //   }
  // }
}
