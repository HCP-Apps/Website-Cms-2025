import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { environment } from '../../../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-slider-image-select',
  standalone: true,
  imports: [
    DialogModule,
    FontAwesomeModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    ButtonComponent,
    FontAwesomeModule
  ],
  templateUrl: './slider-image-select.component.html',
  styleUrls: ['./slider-image-select.component.css'],
})
export class SliderImageSelectComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {}

  imageUrl = environment.image_url_server;
  faCross = faX;
  faTrash = faTrash;
  
  @Input() isVisible!: boolean;
  @Input() selectedImageData: any = [];
  @Output() onImageChange: EventEmitter<any> = new EventEmitter();
  @Output() onCLick: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}

  isBase64(imagePath: any): boolean {
    return typeof imagePath === 'string' && imagePath.startsWith('data:image/') || imagePath.startsWith('../../../../../')
  }

  closeDialog() {
    this.onCLick.emit();
  }

  // setImage(event: any, index: number): void {
  //   const input = event.target as HTMLInputElement;
  //   const file = input.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       this.selectedImageData[index].image = reader.result as string;

  //       const updatedImageData = {
  //         ...this.selectedImageData[index],
  //         image: this.selectedImageData[index].image,
  //       };
  //       this.onImageChange.emit({ file: updatedImageData, index });
  //       this.cdr.detectChanges();
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // }
  setImage(event: any, index: number): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        const img = new Image();
        
        img.onload = () => {
          if (img.width === 1920 && img.height === 888) {
            this.selectedImageData[index].image = reader.result as string;
            const updatedImageData = {
              ...this.selectedImageData[index],
              image: this.selectedImageData[index].image,
            };
            this.onImageChange.emit({ file: updatedImageData, index });
            this.cdr.detectChanges();
          } else {
            alert('Please upload an image with dimensions 1920x888.');
          }
        };
  
        img.src = reader.result as string;
      };
  
      reader.readAsDataURL(file);
    }
  }

  updateCaption(event: any, index: number): void {
    const updatedCaption = event.target.value;
    
    this.selectedImageData[index].captions = updatedCaption;
    
    const updatedData = {
      ...this.selectedImageData[index],
      captions: updatedCaption,
    };
  
    this.onImageChange.emit({ file: updatedData, index });
  }

  SaveDialog() {
    this.onCLick.emit();
  }

  addNewImage(): void {
    const newImage = {
      image: '',
      drawing_captions: '',
    };
  
    if (!this.selectedImageData) {
      this.selectedImageData = [];
    }
  
    this.selectedImageData.push(newImage);
    this.onImageChange.emit({ file: newImage, index: this.selectedImageData.length - 1 });
  }

  openDeleteImage(index: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this image?');
    
    if (confirmDelete) {
      this.selectedImageData.splice(index, 1);
      this.onImageChange.emit({ file: this.selectedImageData, index });
    }
  } 
}
