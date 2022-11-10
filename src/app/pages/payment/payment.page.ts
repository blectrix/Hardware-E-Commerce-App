import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { OrdersPage } from '../tabs/orders/orders.page'; 

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  selectedItems = [];
  selectedOrders = [];
  total = 0;
  totalOrders = 0;
  cart = [];
  cartItemCount: BehaviorSubject<number>;
  orders = [];
  ordersItemCount: BehaviorSubject<number>;

  constructor(public nav: NavController, public popoverCtrl: PopoverController, private router: Router, private cartService: CartService, private ordersService: OrdersService) { }

  public payPalConfig ? : IPayPalConfig;

    ngOnInit(): void {
        this.initConfig();

        let orders = this.ordersService.getOrders();
        let items = this.cartService.getCart();
        let selected = {};
        let selectedOrders = {};

    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = {...obj, count: 1};
      }
    }
    for (let ord of orders) {
      if (selectedOrders[ord.id]) {
        selectedOrders[ord.id].counter++;
      } else {
        selectedOrders[ord.id] = {...ord, counter: 1};
      }
    }

    this.selectedItems = Object.keys(selected).map(key => selected[key])
    this.selectedOrders = Object.keys(selectedOrders).map(key => selectedOrders[key])
    console.log('items: ', this.selectedItems);
    console.log('orders: ', this.selectedOrders);
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
    this.totalOrders = this.selectedOrders.reduce((a, b) => a + (b.counter * b.price), 0);
    
  }

    private initConfig(): void {
        this.payPalConfig = {
            currency: 'USD',
            clientId: 'AYWpg9Wgh2BAClUzTx5v8U9PssAc4SqEv1uLy2Yx4ZrqBGGsBePy7IBBF76L8pYYnafBuPAyBCU9jA3R',
            createOrderOnClient: (data) => < ICreateOrderRequest > {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: '9.99',
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: '9.99'
                            }
                        }
                    },
                    items: [{
                        name: 'Siyeshe Hardware',
                        quantity: '1',
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                            currency_code: 'USD',
                            value: '9.99',
                        },
                    }]
                }]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical',
                size: 'small',
                color: 'blue',
                shape: 'rect'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then(details => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });

            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
            },
            onError: err => {
                console.log('OnError', err);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            }
        };
    }

   payCompleted() {
    // const popover = await this.popoverCtrl.create({
    //   component: OrdersPage
    // });
    // popover.present();
    this.router.navigate(['pay-completed']);
  }

  // sendSMS() {
  //   var options: {
  //     replaceLineBreak: true,
  //     andriod: {
  //       intent
  //     }
  //   }
  // }

  // placeOrder() {
  //   this.selectedItems.forEach(obj => {
  //     firebase.database().ref("orders/" + obj.id).push(this.cart);
  //   });

  //   localStorage.setItem("carts", JSON.stringify([]));

  //   this.popoverCtrl.dismiss();
  //   this.router.navigate(['pay-completed']);
  // }
}
