import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { firebaseAppFactory } from '@angular/fire/app/app.module';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { OrdersModalPage } from '../../orders-modal/orders-modal.page';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  selectedItems = [];
  total = 0;
  orders = [];
  ordersItemCount: BehaviorSubject<number>;
  
  @ViewChild('orders', {static: false, read: ElementRef})fab: ElementRef;

  constructor(private ordersService: OrdersService, private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    let items = this.ordersService.getOrders();
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

  addToOrders(order) {
    this.animateCSS('tada');
    this.ordersService.addOrder(order);
    this.ordersItemCount = this.ordersService.getOrdersItemCount();
  }

  async openOrders() {
    this.animateCSS('bounceOutLeft', true);

    let modal = await this.modalCtrl.create( {
      component: OrdersModalPage,
      cssClass: 'orders-modal'
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

  placeOrder() {
    this.router.navigate(['payment']);
  }

  removeOrdersItem(order) {
    this.ordersService.removeOrder(order);
  }
}
