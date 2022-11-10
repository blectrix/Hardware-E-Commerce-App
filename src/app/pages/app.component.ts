import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app'
import { firebaseConfig } from './firebase.config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor
  (
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    // this.router.navigateByUrl('splash')
    firebase.initializeApp(firebaseConfig);
  }
}
