import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../common/button/button.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cms-topbar',
  standalone: true,
  templateUrl: './cms-topbar.component.html',
  styleUrl: './cms-topbar.component.css',
  imports: [ButtonComponent, RouterModule],
})
export class CmsTopbarComponent {
  @Output() preview = new EventEmitter();
  @Output() publish = new EventEmitter();
  @Input() hasChanges: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  onPreview() {
    this.preview.emit();
  }

  onPublish() {
    this.publish.emit();
  }

  navigateToDashboard() {
    this.router.navigate(['']);
  }
}
