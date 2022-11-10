import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-completed',
  templateUrl: './pay-completed.page.html',
  styleUrls: ['./pay-completed.page.scss'],
})
export class PayCompletedPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigateByUrl('/tabs', { replaceUrl: true });
  }
}
