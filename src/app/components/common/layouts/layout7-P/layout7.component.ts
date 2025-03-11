import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { SliderImageSelectComponent } from '../slider-image-select/slider-image-select.component';

interface Caption {
  captions: string;
}
interface FileWithIndex {
  file: File;
  index: number;
}
@Component({
  selector: 'app-layout7',
  standalone: true,
  imports: [
    CarouselModule,
    TagModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ButtonComponent,
    SliderImageSelectComponent,
  ],
  templateUrl: './layout7.component.html',
  styleUrl: './layout7.component.css',
})
export class Layout7Component implements OnInit {

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  isVisible: boolean = false;
  @Input({ required: true }) isEdit: any;
  @Input({ required: true }) id: any;
  @Input() data!: any[];
  @Input() captions!: Caption[];
  imageUrl = environment.image_url_server;
  selectedImageData: any = null;
  @HostListener('window:scroll', [])
  onWindowScroll() {}
  ngOnInit(): void {
  }
  @Output() imageChange = new EventEmitter<any>();

  isBase64(imagePath: any): boolean {
    return typeof imagePath === 'string' && imagePath.startsWith('data:image/') || imagePath.startsWith('../../../../../')
  }
  scrollToCenter(event: any): void {
    const clickedElement = event.target as HTMLElement;
    const isIndicatorClicked1 =
      clickedElement.classList.contains('p-carousel-prev') ||
      (clickedElement.parentElement &&
        clickedElement.parentElement.classList.contains('p-carousel-prev'));
    if (!clickedElement.classList.contains('img-list')) {
      const carousel =
        this.elementRef.nativeElement.querySelector('.p-carousel-item');
      if (carousel) {
        const rect = carousel.getBoundingClientRect();
        const topOffset = rect.top + window.pageYOffset;
        const middleOfElement = topOffset - 20 + rect.height / 2;

        const windowHeight = window.innerHeight;
        const scrollY = middleOfElement - 20 - windowHeight / 2;

        window.scrollTo({
          top: scrollY,
          behavior: 'smooth',
        });
      }
    } else {
      const rect = clickedElement.getBoundingClientRect();
      const topOffset = rect.top + window.pageYOffset;

      const middleOfElement = topOffset + rect.height / 2;
      const windowHeight = window.innerHeight;
      const scrollY = middleOfElement - windowHeight / 2;
      window.scrollTo({
        top: scrollY,
        behavior: 'smooth',
      });
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  openAddLayoutDialog() {
    this.isVisible = !this.isVisible;
  }
  imageSelectPopUp(data: any) {
    this.selectedImageData = data;
    this.isVisible = true;
  }

  onImageChange(event: any) {
    const { file, index } = event;

    const updatedData = {
      ...this.data[index],
      image: file.image,
      drawing_captions: file.drawing_captions,
    };
    this.imageChange.emit({ file: updatedData, index });
  }
}
