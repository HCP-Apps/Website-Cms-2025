import { Component, Input } from '@angular/core';
import { ArchLandingPage } from '../../../../interfaces/arch-landing-page';

@Component({
  selector: 'app-architecture-landing-page-builder',
  standalone: true,
  imports: [],
  templateUrl: './architecture-landing-page-builder.component.html',
  styleUrl: './architecture-landing-page-builder.component.css'
})
export class ArchitectureLandingPageBuilderComponent {
  @Input({required: true}) layouts! : ArchLandingPage[] 
  
}
