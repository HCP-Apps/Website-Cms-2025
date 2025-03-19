import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() btnLabel! : string;
  @Output() btnClick = new EventEmitter();
  @Input() disabled: boolean = false;

  buttonOnClick() {
    this.btnClick.emit()
  }

}
