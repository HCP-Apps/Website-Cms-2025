import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-delete-layout',
  standalone: true,
  imports: [ButtonComponent, FontAwesomeModule,ButtonModule,DialogModule],
  templateUrl: './delete-layout.component.html',
  styleUrl: './delete-layout.component.css',
})
export class DeleteLayoutComponent {
  faCross = faX;
  @Input() isVisible!: boolean;
  @Output() onCLick: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  closeDialog() {
    this.onCLick.emit();
  }
  DeleteLayout() {
     this.onDelete.emit();
  }
}
