import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-edit-layout',
  standalone: true,
  imports: [
    DialogModule,
    MatFormField,
    MatLabel,
    ButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ButtonModule,
    DialogModule,
    FormsModule, // If you use [(ngModel)]
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './edit-layout.component.html',
  styleUrl: './edit-layout.component.css',
})
export class EditLayoutComponent {
  @Input() layoutArray!: any;
  @Input() isVisible!: boolean;
  @Output() onCLick: EventEmitter<any> = new EventEmitter();
  @Output() selectLayout: EventEmitter<any> = new EventEmitter();
  faCross = faX;

  closeDialog() {
    this.onCLick.emit();
  }

  btnClick(layout_id : number) {
    this.selectLayout.emit(layout_id);
  }
  trackByIndex(index: number, item: string): number {
    return index;
  }
}
