import { Routes } from '@angular/router';
import {ClientComponent} from "./client.component";
import {ClientHomeComponent} from "./home/home.component";

export default [
    {
        path     : '',
        component: ClientComponent,
        children: [
            {
                path: '',
                component: ClientHomeComponent,
            }
        ]
    },
] as Routes;
