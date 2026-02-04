import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './views/layout/base/base.component';
import { guestGuard } from './guards/guest/guest.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivateChild: [guestGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },

  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: "Oops!! The page you were looking for doesn't exist.",
    },
  },
  { path: 'error/:type', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
