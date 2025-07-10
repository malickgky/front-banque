
import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    constructor(private _snackBar: MatSnackBar) { }

    openSnackBar(message: string, action: string = "", duration: number = null) {
        return this._snackBar.open(message, action, {
            duration, // Duration in milliseconds
            panelClass: 'custom-snackbar', // Apply custom style
        });
    }
}

