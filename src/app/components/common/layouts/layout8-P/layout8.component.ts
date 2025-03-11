import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { environment } from '../../../../../environments/environment.development';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-layout8',
  standalone: true,
  imports: [
    CarouselModule,
    TagModule,
    ButtonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './layout8.component.html',
  styleUrl: './layout8.component.css',
})
export class Layout8Component {
  @Input({ required: true }) data!: any;
  @Input() routename!: any;
  @Input() name!: any;
  imageUrl = environment.image_url_server;
  basePath: string = ''; // Initialize basePath

  constructor(private router: Router, private route: ActivatedRoute) {
    const routePath = this.route.snapshot.routeConfig?.path;
    this.basePath = routePath ? routePath.split('/:id')[0] : '';
  }

  // navigate(url: any) {
  //   const basePath = this.route.snapshot.routeConfig?.path?.split('/:id')[0];
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigateByUrl(`${basePath}/${url}`);
  //   });
  // }
  navigate(projectId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(`${this.basePath}/${projectId}`);
    });
  }
}
