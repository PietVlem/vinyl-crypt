import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import { NotificationsContainerComponent } from '@core/components';
import { DrawerComponent } from '@shared/components';
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
      NotificationsContainerComponent,
      BrowserModule,
      AppRoutingModule,
      SharedModule,
      DrawerComponent,
      BrowserAnimationsModule,
      AuthModule.forRoot({
        ...env.auth0,
      }),
    ],
    providers: [
      provideTanStackQuery(new QueryClient())
    ]
})
export class AppModule {}
