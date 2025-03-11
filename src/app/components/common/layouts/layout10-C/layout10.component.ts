import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout10',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,MatInputModule],
  templateUrl: './layout10.component.html',
  styleUrl: './layout10.component.css'
})
export class Layout10Component {
  constructor(private router:Router,public route :ActivatedRoute){}
  @Input() imageName1!: string | null
  @Input() imageName2!: string | null
  @Input() imageName3!: string | null
  @Input() imageName4!: string | null
  @Input() project_name1!: string 
  @Input() project_name2!: string 
  @Input() project_name3!: string 
  @Input() project_name4!: string 
  @Input() project_id1!: string 
  @Input() project_id2!: string 
  @Input() project_id3!: string 
  @Input() project_id4!: string 
  
  @Output() onClick = new EventEmitter()

  imageUrl = environment.image_url_server
  gapInpx = (23 * window.innerWidth) / 1920 + 'px';

  @Input({ required: true }) id: any;
  @Input({ required: true }) isEdit: any;

  setImage(event: any) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.onClick.emit(file);
    }
  }

  navigate(url: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(`${this.route.routeConfig?.path}/${url}`);
    });
  }
}
