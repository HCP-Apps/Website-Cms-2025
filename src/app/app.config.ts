import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImagekitioAngularModule } from 'imagekitio-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate' })),
    importProvidersFrom(
      ImagekitioAngularModule.forRoot({
        publicKey: 'public_eSkInt98ecdbGs468feRZSBOB1U=',
        urlEndpoint: 'https://ik.imagekit.io/bi2uhcctu2',
      })
    ),
  ],
};
