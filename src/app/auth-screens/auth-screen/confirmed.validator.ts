import { FormControlName, FormGroup } from "@angular/forms";
export function ConfirmedValidator(controlName:string,matchingControlName:string)
{
    return (formGroup:FormGroup)=>{
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if(matchingControl.errors && !matchingControl.errors['confirmedValidator'])
        {
            return
        }
        if(control.value!== matchingControl.value){
            matchingControl.setErrors({ConfirmedValidator:true});
        }
        else
        {
            matchingControl.setErrors(null);
        }
    }
}




























// /*
//   Custom validators to use everywhere.
// */

// import { FormControl, FormGroup } from "@angular/forms";

// // SINGLE FIELD VALIDATORS
// export function emailValidator(control: FormControl): {[key: string]: any} {
//     var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
//     if (control.value && !emailRegexp.test(control.value)) {
//       return { invalidEmail: true };
//     }
//   }
  
//   // FORM GROUP VALIDATORS
//   export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
//     return (group: FormGroup): {[key: string]: any} => {
//       let password = group.controls[passwordKey];
//       let confirmPassword = group.controls[confirmPasswordKey];
      
//       if (password.value !== confirmPassword.value) {
//         return {
//           mismatchedPasswords: true
//         };
//       }
//     }
//   }



