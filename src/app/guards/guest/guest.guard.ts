import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SweetAlertService } from '../../services/sweet alert/sweet-alert.service';

export const guestGuard: CanActivateFn = (route, state) => {
  // const userStateService = inject(UserStateService);
  // const router = inject(Router);
  // const sweetAlert = inject(SweetAlertService);

  // return userStateService.userToken$.pipe(
  //   map((token) => {
  //     if (token) {
  //       router.navigate(['/']); // Redirect to home if the user is authenticated
  //       sweetAlert.showAlert({
  //         icon: 'warning',
  //         title: 'you_already_logged_in',
  //       });
  //       return false;
  //     } else {
  //       return true; // Allow access if the user is not authenticated
  //     }
  //   })
  // );
return true;
};
