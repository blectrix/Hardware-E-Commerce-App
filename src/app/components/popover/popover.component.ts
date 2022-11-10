import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { parse } from 'querystring';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  products = [];

  constructor(private cartService: CartService, public popoverController: PopoverController) { }

  
  ngOnInit() {
    this.products = this.cartService.getProducts();
  }

  close() {
    this.popoverController.dismiss();
  }

  async sortAlpha() {
    this.products.sort((a,b) => parseInt(b.id) -parseInt(a.id));
    this.popoverController.dismiss();
    return;
   }

  async sortPriceHigh() {
   this.products.sort((a,b) => parseInt(b.price) -parseInt(a.price));
   this.popoverController.dismiss();
   return;
  }

  async sortPriceLow() {
    this.products.sort((a,b) => parseInt(a.price) -parseInt(b.price));
    this.popoverController.dismiss();
    return;
   }
  async sortRatingHigh() {
    this.products.sort((a,b) => (b.rating) -(a.rating));
    this.popoverController.dismiss();
    return;
   }
   async sortRatingLow() {
    this.products.sort((a,b) => (a.rating) -(b.rating));
    this.popoverController.dismiss();
    return;
   }
}
