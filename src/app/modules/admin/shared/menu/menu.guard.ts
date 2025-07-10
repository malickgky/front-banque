import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const menuGuard: CanActivateFn = (route, state) => {
  const menus = JSON.parse(localStorage.getItem("loginResponseData"))?.menus;
  const router = inject(Router);
  let isAllowed = false;


  menus.map(menu => {
    if (menu.vcUrl == state.url) {
      isAllowed = true;
      return;
    }
  });
  if (!isAllowed) {
    router.navigate(["/lanala-tontine/home"])
  }
  return isAllowed;
};
