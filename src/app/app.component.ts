// import {
//   ChangeDetectionStrategy,
//   Component,
//   HostListener,
//   OnInit,
//   Renderer2,
// } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
//   providers: [],
//   imports: [RouterOutlet],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class AppComponent implements OnInit {
//   constructor(private renderer: Renderer2) {}
//   showNavLogo = false;

//   @HostListener('window:scroll')
//   onScroll(event: Event) {
//     if(window.scrollY > 70) {
//       console.log(window.scrollY)
//       this.showNavLogo = true
//       this.renderer.setStyle(
//         document.querySelector('.footer'),
//         'opacity',
//         '100'
//       );
//     }
//     else {
//       this.showNavLogo = false
//       this.renderer.setStyle(
//         document.querySelector('.footer'),
//         'opacity',
//         '0'
//       );
//     }
//     this.renderer.setStyle(
//       document.querySelector('.top-navbar'),
//       'transition',
//       'opacity 0.5s'
//     );
//     this.renderer.setStyle(
//       document.querySelector('.top-navbar'),
//       'opacity',
//       '0'
//     );
//   }

//   @HostListener('window:scrollend', ['$event'])
//   onScrollEnd(event: Event) {
//     this.renderer.setStyle(
//       document.querySelector('.top-navbar'),
//       'transition',
//       'opacity 1s'
//     );
//     this.renderer.setStyle(
//       document.querySelector('.top-navbar'),
//       'opacity',
//       '1'
//     );
//   }

//   ngOnInit(): void {
    
//   }
// }
import {
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'; 
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
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
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {

  @HostBinding('class.default-style') defaultStyle = true; // Apply default style initially

  constructor (private router : Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.defaultStyle = true;
      }
    });
  }

  ngOnInit(): void {
    window.scrollTo({top: 0})
  }
  
}
