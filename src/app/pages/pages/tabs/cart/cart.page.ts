import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CartModalPage } from '../../cart-modal/cart-modal.page';
import { Router } from '@angular/router';
import { count, countReset } from 'console';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  selectedItems = [];
  total = 0;
  cart = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor(private cartService: CartService, private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    let items = this.cartService.getCart();
    let selected = {};

    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = {...obj, count: 1};
      }
    }

    this.selectedItems = Object.keys(selected).map(key => selected[key])
    console.log('items: ', this.selectedItems);
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
  }

  doRefresh(ev) {
    setTimeout(() => {
      ev.target.complete();
    }, 2000)
  }

  addToCart(product) {
    this.animateCSS('tada');
    this.cartService.addProduct(product);
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    let modal = await this.modalCtrl.create( {
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);

      }
        node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }

  payment() {
    this.router.navigate(['payment']);
  }
}
