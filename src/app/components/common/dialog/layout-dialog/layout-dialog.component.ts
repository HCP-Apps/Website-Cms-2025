import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-layout-dialog',
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
    FormsModule, // If you use [(ngModel)]
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './layout-dialog.component.html',
  styleUrl: './layout-dialog.component.css',
})
export class LayoutDialogComponent {
  @Input({required: true}) isVisible!: boolean;
  @Input() layoutArray!: any;
 
  @Output() onCLick : EventEmitter<any> = new EventEmitter()
  @Output() selectLayout : EventEmitter<number> = new EventEmitter()
  
  faCross = faX

  closeDialog() {
    this.onCLick.emit()
  }
  
  btnClick(layout_id : number) {
    this.selectLayout.emit(layout_id)
  }
}
