import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InactivityService } from './modules/admin/inactivity.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet]
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor(private inactivityService: InactivityService, ) {
        this.inactivityService.setupListeners();
        // this.myNavigationService.onPopState();
    }
}
