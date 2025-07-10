/* eslint-disable */
import { inject } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { AuthService } from 'app/core/auth/auth.service';
import { ReplaySubject } from 'rxjs';


export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'client',
        title: 'Clients',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/banque/client',
    },
    {
        id: 'compte',
        title: 'Comptes',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/banque/compte',
    },


];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Tableau de bord',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/banque/dashboard',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Tableau de bord',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/banque/dashboard',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Tableau de bord',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/banque/dashboard',
    },
];
