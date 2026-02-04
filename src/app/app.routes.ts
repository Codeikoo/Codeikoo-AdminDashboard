import { Routes } from '@angular/router';

import { BaseComponent } from './views/layout/base/base.component';
import { guestGuard } from './guards/guest/guest.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
// import { authGuard } from './dashboard/core/guards/auth.guard';

export const routes: Routes = [
    // {
    //     path: 'auth',
    //     canActivate: [guestGuard],
    //     loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    // },
    {
        path: '',
        component: BaseComponent,
        // canActivate: [authGuard],
        children: [
            {
                path: 'academy',
                loadChildren: () => import('./dashboard/features/academy/pages/academy.routes').then(m => m.ACADEMY_ROUT)
            },
            // Other features can be added here
        ]
    },

    // {
    //     path: 'error',
    //     component: ErrorPageComponent,
    //     data: {
    //         type: 404,
    //         title: 'Page Not Found',
    //         desc: "Oops!! The page you were looking for doesn't exist.",
    //     },
    // },
    // { path: 'error/:type', component: ErrorPageComponent },
    // { path: '**', redirectTo: 'error', pathMatch: 'full' },
];
