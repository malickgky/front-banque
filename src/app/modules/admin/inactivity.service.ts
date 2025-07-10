import { Injectable, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private timeoutId: any;
  private readonly inactivityTime = 10 * 60 * 1000; // 5 Minutes


  constructor(private router: Router,
              // private location: Location,
              private _fuseConfirmationService: FuseConfirmationService,
    private _activatedRoute: ActivatedRoute, private authService: AuthService, private _router: Router, private activatedRoute: ActivatedRoute) {
    this.resetTimeout();
    this.setupListeners();

  }

  setupListeners(): void {
    window.addEventListener('mousemove', () => this.resetTimeout());
    window.addEventListener('keydown', () => this.resetTimeout());
  }

  private resetTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      if (!this.router.url.includes("sign-in")) {
        this.confirmReconnect();
      }
    }, this.inactivityTime);
  }

  confirmReconnect() {
    // Open the confirmation dialog

    this.authService.signOut();

    location.reload();

    // this.location.reload();

    // const confirmation = this._fuseConfirmationService.open({
    //   title: 'Votre session a expiré',
    //   message: "Veuillez vous connecter à nouveau pour continuer à utiliser l'application",
    //   icon: {
    //     show: true,
    //     name: 'heroicons_outline:information-circle',
    //     color: 'primary',
    //   },
    //   actions: {
    //     confirm: {
    //       label: 'Se reconnecter',
    //       color: 'primary'
    //     },
    //     cancel: {
    //       show: false,
    //     },
    //   },
    // }).afterClosed().subscribe({
    //   next: value => {
    //     location.reload();
    //   }
    // });


    // Reload the app
    // location.reload();


    // this._router.navigate(['/sign-out']);
  }

  // private logout(): void {
  //   this.ngZone.run(() => {
  //     // Votre logique de déconnexion, par exemple :
  //     // localStorage.removeItem('token');
  //     // this.router.navigate(['/login']);
  //     console.log('Utilisateur déconnecté pour inactivité');
  //   });
  // }
}
