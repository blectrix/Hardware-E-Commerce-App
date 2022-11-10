import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  type = true;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    public toastController: ToastController
    ) { 
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]})
    });
  }

  changeType() {
    this.type = !this.type;
  }

  async loginSucToast() {
    const toast = await this.toastController.create({
      message: "You're logged in.",
      duration: 2000
    });
    toast.present();
  }

  async loginFailToast() {
    const toast = await this.toastController.create({
      message: "Failed Logging in!",
      duration: 2000
    });
    toast.present();
  }

  onSubmit() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    this.authService.login(this.form.value).then((data) => {
      console.log(data);
      this.router.navigateByUrl('/tabs', {replaceUrl: true});
      this.isLoading = false;
      this.form.reset();
    })
    .catch(e => {
      console.log(e);
      this.isLoading = false;
      let msg = 'Could not sign you in, please try again';
      if(e.code == 'auth/user-not-found') {
        msg = 'Email id could not be found';
      } else if(e.code == 'auth/wrong-password') {
        msg = 'Please enter correct password';
      }
      this.showAlert(msg);
      this.loginFailToast();
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
}
