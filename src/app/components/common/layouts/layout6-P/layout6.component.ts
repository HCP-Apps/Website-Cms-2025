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
}
