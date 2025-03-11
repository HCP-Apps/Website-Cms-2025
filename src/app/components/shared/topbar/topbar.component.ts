import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from "../../common/button/button.component";
import { ButtonModule } from 'primeng/button';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-topbar',
    standalone: true,
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.css',
    animations: [
      trigger('showHideNavLogo', [
        state(
          'hidden',
          style({
            opacity: 0,
            transform: 'translateY(-100%)',
          })
        ),
        state(
          'visible',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          })
        ),
        transition('hidden => visible', animate('300ms ease-in')),
        transition('visible => hidden', animate('300ms ease-out')),
      ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush change detection strategy
    imports: [ButtonComponent,ButtonModule,CommonModule]
})
export class TopbarComponent {
  @Input({required: true}) isSidebar! : boolean
  @Input({required: true}) isEdit! : boolean
  @Output() toogleSideBar = new EventEmitter()
  @Output() preview = new EventEmitter()
  @Output() publish = new EventEmitter()

  showBtn : boolean = false

  hoverOn() {
    this.showBtn = true
  }

  hoverOff() {
    this.showBtn = false
  }

  onPreview() {
    this.preview.emit()
  }

  onPublish() {
    this.publish.emit()
  }
  toogleClick() {
    this.toogleSideBar.emit()
  }
}
