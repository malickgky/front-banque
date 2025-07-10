import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyNavigationService {

  constructor(private location: Location) {
    // Listen for the popstate event
    window.addEventListener('popstate', this.onPopState.bind(this));
  }

  onPopState(event: PopStateEvent) {
    // Reload the page when the back button is clicked
    location.reload();
  }
}
