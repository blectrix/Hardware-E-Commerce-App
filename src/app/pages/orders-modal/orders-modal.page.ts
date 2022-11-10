import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Order, OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-modal',
  templateUrl: './orders-modal.page.html',
  styleUrls: ['./orders-modal.page.scss'],
})
export class OrdersModalPage implements OnInit {

  orders: Order[] =[];
  
  constructor(private ordersService: OrdersService, private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    this.orders = this.ordersService.getOrders();
  }

  decreaseOrdersItem(order) {
    this.ordersService.decreaseOrder(order);
  }

  increaseOrdersItem(order) {
    this.ordersService.addOrder(order);
  }

  removeOrdersItem(order) {
    this.ordersService.removeOrder(order);
  }

  getTotal() {
    return this.orders.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  checkout() {
    this.router.navigate(['tabs/orders']);
    this.modalCtrl.dismiss();
  }
}
