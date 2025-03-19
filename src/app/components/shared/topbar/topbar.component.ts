import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { ButtonComponent } from '../../common/button/button.component';
import { ButtonModule } from 'primeng/button';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  imports: [ButtonComponent, ButtonModule, CommonModule],
})
export class TopbarComponent implements OnInit {
  @Input({ required: true }) isSidebar!: boolean;
  @Input({ required: true }) isEdit!: boolean;
  @Output() toogleSideBar = new EventEmitter();
  @Output() preview = new EventEmitter();
  @Output() publish = new EventEmitter();
  constructor(private router: Router,private renderer: Renderer2,) {}
  showBtn: boolean = false;
  isScrolling: boolean = true;
  scrollTimeout: any;   
  lastScrollTop = 0;
  ngOnInit(): void {
    this.lastScrollTop = 0;
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolling = true;
    clearTimeout(this.scrollTimeout);
    if (this.isScrolling) {
      this.scrollTimeout = setTimeout(() => {
        if (document.documentElement.scrollTop > 0) {
          this.renderer.setStyle(
            document.querySelector('.top-navbar'),
            'top',
            '-80px'
          );
          this.isScrolling = false;
        }
      }, 3000);
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    try {
      if (
        document.documentElement.scrollTop >
        Math.ceil(Math.ceil(documentHeight * 0.40))
      ) {
        this.renderer.setStyle(document.querySelector('.footer'), 'visibility', 'visible');
      } else {
        // this.showNavLogo = false;
        this.renderer.setStyle(document.querySelector('.footer'), 'visibility', 'hidden');
      } 
    } catch (Error) {}

    if (scrollTop > this.lastScrollTop) {
      this.renderer.setStyle(
        document.querySelector('.top-navbar'),
        'top',
        '-80px'
      );
    } else {
      this.renderer.setStyle(
        document.querySelector('.top-navbar'),
        'top',
        '0px'
      );
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  hoverOn() {
    this.showBtn = true;
  }

  hoverOff() {
    this.showBtn = false;
  }

  onPreview() {
    this.preview.emit();
  }

  onPublish() {
    this.publish.emit();
  }
  toogleClick() {
    this.toogleSideBar.emit();
  }
  navigateToDashboard() {
    this.router.navigate(['']);
  }
}
