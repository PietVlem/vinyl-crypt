import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseLayoutComponent } from '@layouts/base/base.component';
import { SharedModule } from '../../shared/shared.module';
import { CallbackRoutingModule } from './callback-routing.module';
import { CallbackComponent } from './callback.component';

@NgModule({
  declarations: [CallbackComponent],
  imports: [
    CommonModule, 
    SharedModule, 
    CallbackRoutingModule,
    BaseLayoutComponent
  ],
})
export class CallbackModule {}