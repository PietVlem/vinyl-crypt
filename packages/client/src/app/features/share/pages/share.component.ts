import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routePaths } from '@app/routes';
import { ShareLinksService } from '@features/share/data-access';

@Component({
  selector: 'app-share',
  imports: [CommonModule],
  templateUrl: './share.component.html',
})
export class ShareComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private shareLinkService = inject(ShareLinksService);

  data = signal<any>(null);
  token = signal<string>('');
  queryEnabled = signal<boolean>(false);

  SharedLinkDataQuery = this.shareLinkService.getSharedData(this.token, this.queryEnabled);

  ngOnInit(): void {
    const routeSubscription = this.activateRoute.paramMap
      .subscribe((params) => {
        const token = params.get('token');
        token && this.token.set(token);
      });


    const metaDataSubscription = this.activateRoute.data.subscribe((res: any) => {
      console.log(res.metaData);

      if(!res.metaData) return

      if(!res.metaData.isValid) {
        this.router.navigate([routePaths.ERROR], { queryParams: { code: 404 } });
      }

      if(res.metaData.isExpired) {
        this.router.navigate([routePaths.ERROR], { queryParams: { code: 410 } });
      }

      if(res.metaData.hasPassword) {
        // password Logic
      }

      this.queryEnabled.set(true);
    });

    this.destroyRef.onDestroy(() => {
      routeSubscription.unsubscribe()
      metaDataSubscription.unsubscribe()
    })
  }
}