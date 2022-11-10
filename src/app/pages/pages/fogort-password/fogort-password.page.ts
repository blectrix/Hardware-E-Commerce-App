import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
// import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-fogort-password',
  templateUrl: './fogort-password.page.html',
  styleUrls: ['./fogort-password.page.scss'],
})
export class FogortPasswordPage implements OnInit {

  email: string;

  constructor
  (
    private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async resetPassword()
  {
    if(this.email)
    {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait..',
        spinner: 'crescent',
        showBackdrop: true
      })
      loading.present();

      this.afauth.sendPasswordResetEmail(this.email)
      .then(()=> {
        loading.dismiss();
        this.toast('Please check your email!', 'success');
        this.router.navigate(['/auth-screen']);
      })
      .catch((error)=> {
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
    } else {
      this.toast('Please enter your email address!', 'danger');
    }
  } // end of reset password

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

  // forgotPassword() {
  //   this.authService.forgotPassword(this.email);
  //   this.email = '';
  // }

  // async resetPassword(form):Promise<void>{
  //   this.authService.resetPassword(form.value.email).
  //   then(
  //     async ()=>{
  //       const alert = await this.alertCtrl.create({
  //         message:'Check your email to reset password',
  //         buttons:[{text:'ok',role:'cancel',handler:()=>{
  //           this.router.navigateByUrl('login');
  //         },},],
  //       });
  //       await alert.present();
        
  //     },
  //     async error => {
  //       const errorAlert = await this.alertCtrl.create({
  //         message:error.message,
  //         buttons:[{text:'ok',role:'cancel'}],
  //       });
  //       await errorAlert.present();
  //     }
  //   )
  //   const toast = await this.toastController.create({
  //     message: 'Check your junk/spam folder to retrieve the reset code.',
  //     duration: 5000,
  //     position: 'top'
  //   });
  //   toast.present();

  //   alert("Reset link sent to your mailbox.");
  //   this.router.navigateByUrl('/auth-screen', {replaceUrl: true});
  // }

  // async bye() {
  //   const toast = await this.toastController.create({
  //     message: 'Check in your junk mails to retrieve the reset code.',
  //     duration: 5000,
  //     position: 'top'
  //   });
  //   toast.present();

  //   alert("Reset link sent to your mailbox.");
  //   this.router.navigateByUrl('/auth-screen', {replaceUrl: true});
  // }

}
