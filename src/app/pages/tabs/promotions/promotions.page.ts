import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { CartService } from 'src/app/services/cart.service';
import { CartModalPage } from '../../cart-modal/cart-modal.page';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss'],
})
export class PromotionsPage implements OnInit {

  id: any;
  hardware: any;
  promos: any[] = [];
  items: any[] = [];
  products = [];
  cart = [];
  cartItemCount: BehaviorSubject<number>;
  
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private api: ApiService,
    private cartService: CartService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getId();
    this.getData();
  }

  getId() {  
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(!id) {
      this.navCtrl.back();
      return;
    }
    this.id = id;
  }

  getData() { 
    this.hardware = this.api.promos.find(x => x.id == this.id);
    this.promos = this.api.promos;
    this.items = [...this.api.allItems].filter(x => x.uid == this.id);
    console.log(this.items);

    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  getCuisines(data) {
    return data.join(', ');
  }

  addToCart(product) {
    this.animateCSS('tada');
    this.cartService.addProduct(product);
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

}
