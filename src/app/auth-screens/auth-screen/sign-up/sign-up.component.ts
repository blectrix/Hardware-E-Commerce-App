import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfirmedValidator } from '../confirmed.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  type = false;
  isLoading: boolean;
  segmentValue: '1';

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    public toastr: ToastController
    ) { 
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      surname: new FormControl(null, {validators: [Validators.required]}),
      username: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}), // added email validator also
      contact: new FormControl(null, {validators: [Validators.required, Validators.minLength(10)]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
      confirm_password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]})
    }), {validator: ConfirmedValidator('password', 'confirm_password')}
  }

  get f()
  {
    return this.form.controls;
  }

  changeType() {
    this.type = !this.type;
  }

  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      position: 'top',
      color: status,
      duration: 2000
    });

    toast.present();
  } // end of toast

  onSubmit() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    console.log(this.form.value);
    this.authService.register(this.form.value).then((data) => {
      console.log(data);
      this.router.navigateByUrl('/auth-screen', {replaceUrl: true});
      this.toast('You have successfully created your account! Now Sign In!', 'success')
      this.isLoading = false;
      this.form.reset();
    })
    .catch(e => {
      console.log(e);
      this.isLoading = false;
      let msg = 'Could not sign up, please try again';
      if(e.code == 'auth/email-already-in-use') {
        msg = 'Email is already in use, try sign up with a different email id';
      }
      this.showAlert(msg);
    });
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      header: 'Authintication Failed',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

    // FORM GROUP VALIDATORS
matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];
    
    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  }
}



}
