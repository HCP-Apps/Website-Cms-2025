import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '../../../../../environments/environment.development';
interface FileWithIndex {
  file: File;
  index: number;
}
@Component({
  selector: 'app-layout6',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './layout6.component.html',
  styleUrl: './layout6.component.css',
})
export class Layout6Component implements OnInit {
  @Input({ required: true }) id: any;
  @Input({ required: true }) isEdit: any;
  @Input() imageName1!: string | null;
  @Input() imageName2!: string | null;
  @Input() imageName3!: string | null;
  imageUrl = environment.image_url_server;
  customGap: string = '';
  @Output() getFile = new EventEmitter<FileWithIndex>();

  ngOnInit(): void {
    this.customGap = (23 * window.innerWidth) / 1920 + 'px';
  }

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

  //         if (index === 0 && width === 949 && height === 1080) {
  //           resolve(true); 
  //         } else if (
  //           (index === 1 || index === 2) &&
  //           width === 949 &&
  //           height === 529
  //         ) {
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
