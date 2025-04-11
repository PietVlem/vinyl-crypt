import { ComponentPortal, ComponentType, Portal } from '@angular/cdk/portal';
import { ComponentRef, Injectable, InjectionToken, Injector, signal } from '@angular/core';
import { Subject } from 'rxjs';

export const CONTEXT_TOKEN = new InjectionToken('DRAWER_DATA')

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private componentPortal = new Subject<Portal<ComponentRef<unknown>> | null>();

  isShown = signal(false);

  getPortal = () => this.componentPortal.asObservable();

  show = (Component: ComponentType<unknown>, data: any) => {
    const injector = Injector.create({
      providers: [
        { provide: CONTEXT_TOKEN, useValue: data }
      ]
    })

    this.componentPortal.next(new ComponentPortal(Component, null, injector));

    this.isShown.set(true)
  }

  hide = () => this.isShown.set(false);
}
