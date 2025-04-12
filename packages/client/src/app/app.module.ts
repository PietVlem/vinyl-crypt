import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule, authHttpInterceptorFn } from '@auth0/auth0-angular';
import { DrawerComponent } from '@components';
import { environment as env } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared';

@NgModule({ 
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
      DrawerComponent,
      BrowserModule,
      AppRoutingModule,
      SharedModule,
      AuthModule.forRoot({
        ...env.auth0,
      }),
    ],
    providers: [
      AuthHttpInterceptor,
      provideHttpClient(withInterceptors([authHttpInterceptorFn]))
    ]
})
export class AppModule {}
