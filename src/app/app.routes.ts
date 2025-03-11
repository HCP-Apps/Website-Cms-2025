import { Routes } from '@angular/router';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { PageSelectionComponent } from './components/pages/page-selection/page-selection.component';
import { ArchitectureProjectPageComponent } from './components/pages/architecture-project-page/architecture-project-page.component';
import { UrbanismProjectPageComponent } from './components/pages/urbanism-project-page/urbanism-project-page.component';
import { ArchitectureLandingPageComponent } from './components/pages/architecture-landing-page/architecture-landing-page.component';
import { UrbanLandingPageComponent } from './components/pages/urban-landing-page/urban-landing-page.component';
import { PressNewsComponent } from './components/pages/press-news/press-news.component';

export const routes: Routes = [
    {path: "", component: PageSelectionComponent},
    {path: "homepage", component: HomepageComponent},
    {path: "press", component: PressNewsComponent},
    {path: "architecture/:id", component: ArchitectureProjectPageComponent},
    {path: "urbanism/:id", component: UrbanismProjectPageComponent},
    {path: "architecture", component: ArchitectureLandingPageComponent},
    {path: "urbanism", component: UrbanLandingPageComponent},
    {path: "legacy", component: UrbanLandingPageComponent},
];
