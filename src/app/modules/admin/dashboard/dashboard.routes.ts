import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './home/home.component';

export default [
    {
        path     : '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: DashboardHomeComponent,
            }
        ]
    },
] as Routes;
