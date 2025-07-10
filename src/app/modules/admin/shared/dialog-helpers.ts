import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Injectable} from "@angular/core";
import {DateTime} from "luxon";
import {DatePipe} from "@angular/common";

@Injectable({providedIn: 'root'})
export class DialogHelper {
    constructor(private formBuilder: UntypedFormBuilder) {
    }


    confirmSave(message): UntypedFormGroup {
        return this.formBuilder.group({
            title: "Validation de l'opération",
            message: message,
            icon: this.formBuilder.group({
                show: true,
                name: 'heroicons_outline:question-mark-circle',
                color: 'success',
            }),
            actions: this.formBuilder.group({
                confirm: this.formBuilder.group({
                    show: true,
                    label: 'Valider',
                    color: 'primary',
                }),
                cancel: this.formBuilder.group({
                    show: true,
                    color: 'warn',
                    label: 'Annuler',
                }),
            }),
            dismissible: true,
        });
    }

    confirmDanger(message): UntypedFormGroup {
        return this.formBuilder.group({
            title: "Validation de l'opération",
            message: message,
            icon: this.formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation-triangle',
                color: 'warn',
            }),
            actions: this.formBuilder.group({
                confirm: this.formBuilder.group({
                    show: true,
                    label: 'Valider',
                    color: 'warn',
                }),
                cancel: this.formBuilder.group({
                    show: true,
                    label: 'Annuler',
                }),
            }),
            dismissible: true,
        });
    }

    infoDialog(message): UntypedFormGroup {
        return this.formBuilder.group({
            title: "Information",
            message: message,
            icon: this.formBuilder.group({
                show: true,
                name: 'heroicons_outline:information-circle',
                color: 'success',
            }),
            actions: this.formBuilder.group({
                confirm: this.formBuilder.group({
                    show: true,
                    label: 'OK',
                    color: 'primary',
                }),
                cancel: this.formBuilder.group({
                    show: false,
                    color: 'warn',
                    label: 'Annuler',
                }),
            }),
            dismissible: true,
        });
    }


}



