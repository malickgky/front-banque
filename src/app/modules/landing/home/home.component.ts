import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FuseNavigationService, FuseVerticalNavigationComponent} from '@fuse/components/navigation';
import {AuthService} from 'app/core/auth/auth.service';

@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [MatButtonModule, MatIconModule]
})
export class LandingHomeComponent implements OnInit {
    user: any;
    menu: any[] = [];
    /**
     * Constructor
     */
    constructor(private _autService: AuthService, private _fuseNavigationService: FuseNavigationService) {
    }

    ngOnInit(): void {

    }

}
