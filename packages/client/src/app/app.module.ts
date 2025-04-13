import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { DrawerComponent } from '@components';
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
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
      provideTanStackQuery(new QueryClient())
    ]
})
export class AppModule {}
