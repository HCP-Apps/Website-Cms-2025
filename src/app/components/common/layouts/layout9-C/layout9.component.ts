import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-layout9',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatInputModule],
  templateUrl: './layout9.component.html',
  styleUrl: './layout9.component.css',
})
export class Layout9Component {
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  @Input() imageName1!: string | null;
  @Input() imageName2!: string | null;
  @Input() imageName3!: string | null;
  @Input() imageName4!: string | null;
  @Input() project_name1!: string;
  @Input() project_name2!: string;
  @Input() project_name3!: string;
  @Input() project_name4!: string;
  @Input() project_id1!: string;
  @Input() project_id2!: string;
  @Input() project_id3!: string;
  @Input() project_id4!: string;

  @Output() onClick = new EventEmitter();

  gapInpx = (22 * window.innerWidth) / 1920 + 'px';
  imageUrl = environment.image_url_server;
  @Input() isEdit!: boolean;
  @Input() layoutIndex!: number;

  @Output() imageUpload = new EventEmitter<any>();
  @Output() imageDelete = new EventEmitter<any>();
  @Output() titleChange = new EventEmitter<{
    layoutIndex: number;
    projectId: string;
    newTitle: string;
  }>();

  isBase64(imagePath: string | null): boolean {
    return imagePath ? imagePath.startsWith('data:image/') : false;
  }

  onTitleChange(projectId: string, newTitle: string): void {
    this.titleChange.emit({
      layoutIndex: this.layoutIndex,
      projectId: projectId,
      newTitle: newTitle,
    });
  }

  setImage(event: any, imageIndex: number): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
        this.imageUpload.emit({ file, layoutIndex: this.layoutIndex, imageIndex });
    }
    this.cdr.detectChanges();
}

  

  deleteImage(imageIndex: number): void {
    this.imageDelete.emit({ layoutIndex: this.layoutIndex, imageIndex });
  }

  navigate(url: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(`${this.route.routeConfig?.path}/${url}`);
    });
  }
}
