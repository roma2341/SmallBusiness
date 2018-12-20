import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpAuthInterceptor } from '../security/interceptors/http-auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  providers: [
    CookieService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    }
  ]
})
export class SharedModule {
   /**
    * Allows for retrieving singletons using `AppModule.injector.get(MyService)`
    * This is good to prevent injecting the service as constructor parameter.
    */
   static injector: Injector;

   constructor(injector: Injector) {
     SharedModule.injector = injector;
   }
}
