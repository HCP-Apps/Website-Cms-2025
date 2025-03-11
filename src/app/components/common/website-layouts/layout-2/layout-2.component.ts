import { Component, Input } from '@angular/core';
import { Homepage } from '../../../../interfaces/homepage';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout-2',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './layout-2.component.html',
  styleUrl: './layout-2.component.css',
})
export class Layout2Component {
  @Input() layout!: Homepage;
}
