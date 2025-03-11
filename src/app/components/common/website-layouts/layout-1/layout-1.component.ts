import { Component, Input } from '@angular/core';
import { Homepage } from '../../../../interfaces/homepage';

@Component({
  selector: 'app-layout-1',
  standalone: true,
  imports: [],
  templateUrl: './layout-1.component.html',
  styleUrl: './layout-1.component.css'
})
export class Layout1Component {
  @Input({required: true}) layout! : Homepage
}
