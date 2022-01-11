import { Directive, HostListener, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive({
    selector: "[LimitTextTo]",
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: LimitTextToDirective,
        multi: true
    }]
})
export class LimitTextToDirective implements Validator {

    @Input() LimitTextTo: number = 0;

    constructor() {}

    validate(control: AbstractControl): ValidationErrors {
        const limit = !this.LimitTextTo ? 0 : this.LimitTextTo;
        const value: string = control.value;
        return value && limit > 0 && value.length > limit ? { maxLength: true } : control.errors;
    }

    @HostListener("keydown", ["$event"])
    onKeyDown(event: any) {
        const limit = !this.LimitTextTo ? 0 : this.LimitTextTo;

        if (
            limit > 0 &&
            event.target.value.length >= limit &&
            [ 8, 9, 46, 37, 38, 39, 40 ].includes(event.keyCode) == false
        ) {
            event.preventDefault();
        }
    }
}
