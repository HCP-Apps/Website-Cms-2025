import {
  Component,
  VERSION,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-canvas-test',
  templateUrl: './canvas-test.component.html',
  styleUrls: ['./canvas-test.component.css'],
  standalone: true,
  imports: [ImagekitioAngularModule],
})
export class CanvasTestComponent {
  handleUploadSuccess(event: any) {
    console.log(event);
  }

  handleUploadError(event: any) {
    console.log(event);
  }
  // @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  // private context!: CanvasRenderingContext2D;

  // private image!: HTMLImageElement;

  // private cropStartX!: number;
  // private cropStartY!: number;
  // private cropWidth!: number;
  // private cropHeight!: number;

  // constructor() {}

  // ngOnInit() {
  //   this.context = this.canvas.nativeElement.getContext(
  //     '2d'
  //   ) as CanvasRenderingContext2D;
  //   this.loadImage();
  // }

  // loadImage() {
  //   this.image = new Image();
  //   this.image.src =
  //     '../../../../assets/19052-00-00-3D-2001-220401-EE PM OFFICE-1.jpg'; // Replace with your image path
  //   this.image.onload = () => {
  //     this.context.drawImage(this.image, 0, 0, 8000, 8000);
  //   };
  // }

  // onMouseDown(event: MouseEvent) {
  //   const rect = this.canvas.nativeElement.getBoundingClientRect();
  //   this.cropStartX = event.clientX - rect.left;
  //   this.cropStartY = event.clientY - rect.top;
  // }

  // onMouseUp(event: MouseEvent) {
  //   const rect = this.canvas.nativeElement.getBoundingClientRect();
  //   const cropEndX = event.clientX - rect.left;
  //   const cropEndY = event.clientY - rect.top;

  //   this.cropWidth = cropEndX - this.cropStartX;
  //   this.cropHeight = cropEndY - this.cropStartY;

  //   this.cropImage();
  // }

  // cropImage() {
  //   const tempCanvas = document.createElement('canvas');
  //   const tempContext = tempCanvas.getContext('2d');

  //   tempCanvas.width = 1227;
  //   tempCanvas.height = 510;

  //   tempContext?.drawImage(
  //     this.canvas.nativeElement,
  //     this.cropStartX,
  //     this.cropStartY,
  //     this.cropWidth,
  //     this.cropHeight,
  //     0,
  //     0,
  //     1227,
  //     510
  //   );

  //   // Save the cropped image
  //   const croppedImageData = tempCanvas.toDataURL('image/jpeg');

  //   // Create a link element to download the image
  //   const link = document.createElement('a');
  //   link.href = croppedImageData;
  //   link.download = 'cropped_image.jpg';

  //   // Simulate a click on the link to trigger the download
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   this.compressImage(1);
  //   // Clear the canvas
  //   this.context.clearRect(
  //     0,
  //     0,
  //     this.canvas.nativeElement.width,
  //     this.canvas.nativeElement.height
  //   );

  //   // Draw the cropped image onto the canvas
  //   this.context.drawImage(
  //     tempCanvas,
  //     0,
  //     0,
  //     this.canvas.nativeElement.width,
  //     this.canvas.nativeElement.height
  //   );
  // }

  // compressImage(quality: number) {
  //   // Clear the canvas
  //   this.context.clearRect(
  //     0,
  //     0,
  //     this.canvas.nativeElement.width,
  //     this.canvas.nativeElement.height
  //   );

  //   // Draw the image onto the canvas with reduced quality
  //   this.context.drawImage(
  //     this.image,
  //     0,
  //     0,
  //     this.canvas.nativeElement.width,
  //     this.canvas.nativeElement.height
  //   );

  //   // Convert the canvas content to a compressed image data URL
  //   const compressedImageDataUrl = this.canvas.nativeElement.toDataURL(
  //     'image/jpeg',
  //     0.5
  //   );

  //   // Display the compressed image
  //   const compressedImage = new Image();
  //   compressedImage.src = compressedImageDataUrl;
  //   compressedImage.onload = () => {
  //     this.context.drawImage(compressedImage, 0, 0);
  //   };
  //   const link = document.createElement('a');
  //   link.href = compressedImageDataUrl;
  //   link.download = 'cropped_image_compress.jpg';

  //   // Simulate a click on the link to trigger the download
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }
}
