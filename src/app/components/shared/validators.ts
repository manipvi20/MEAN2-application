import { FormControl } from "@angular/forms";

export class BasicValidator {
    static emailValidation(control : FormControl) {
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid =  regEx.test(control.value);
        console.log(control.value);
        console.log("===");
        return valid ? null : {email: true};
    }
}