import { Injectable } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class MenuVisibilityService {
    constructor(private authService: AuthService) {}

    isMenuVisible(identifier: string, key: 'code' | 'url'): boolean {
        const userMenus = this.authService.loginResponseData?.menus;

        if (!userMenus || !Array.isArray(userMenus)) {
            return false;
        }

        return userMenus.some(menu => menu[key] === identifier);
    }
}
