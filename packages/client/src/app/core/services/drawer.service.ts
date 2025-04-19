import { ComponentPortal, ComponentType, Portal } from '@angular/cdk/portal';
import { ComponentRef, effect, Injectable, InjectionToken, Injector, signal } from '@angular/core';
import { Subject } from 'rxjs';

export const DRAWER_CONTEXT_TOKEN = new InjectionToken('DRAWER_DATA')

export interface DrawerContext {
  data?: {
    [key: string]: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private componentPortal = new Subject<Portal<ComponentRef<unknown>> | null>();

  isShown = signal(false);

  constructor() {
    effect(() => {
      document.body.style.overflow = this.isShown() ? 'hidden' : '';
    });
  }

  getPortal = () => this.componentPortal.asObservable();

  show = (Component: ComponentType<unknown>, ctx: DrawerContext) => {
    const injector = Injector.create({
      providers: [
        { provide: DRAWER_CONTEXT_TOKEN, useValue: ctx }
      ]
    })

    this.componentPortal.next(new ComponentPortal(Component, null, injector));

    this.isShown.set(true)
  }

  hide = () => this.isShown.set(false);
}
