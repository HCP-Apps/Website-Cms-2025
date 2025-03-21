import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout11',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,MatInputModule],
  templateUrl: './layout11.component.html',
  styleUrl: './layout11.component.css'
})
export class Layout11Component {
  constructor(private router:Router, public route:ActivatedRoute){}
  @Input() imageName1!: string | null
  @Input() imageName2!: string | null
  @Input() project_name1!: string 
  @Input() project_name2!: string  
  @Input() project_id1!: string 
  @Input() project_id2!: string 
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
