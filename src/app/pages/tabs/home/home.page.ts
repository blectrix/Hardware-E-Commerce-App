import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AnimationBuilder, ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
// import { user_key } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { StorageService } from 'src/app/services/storage.service';
import SwiperCore, { SwiperOptions, Autoplay, Pagination, EffectCoverflow } from 'swiper';
import { CartModalPage } from '../../cart-modal/cart-modal.page';
import { doc, Firestore } from '@angular/fire/firestore';
import { setDoc } from '@firebase/firestore';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PopoverComponent } from '../../../components/popover/popover.component';

export const user_key = 'siyeshe_holdings_user_id';

SwiperCore.use([Autoplay, Pagination, EffectCoverflow]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {

  query: string;
  searchBtn: boolean;
  searchBar: boolean;
  banners: any[] = [];
  categories: any[] = [];
  promos: any[] = [];
  sellers: any[] = [];
  bannerConfig: SwiperOptions;
  categoryConfig: SwiperOptions;
  hardwareConfig: SwiperOptions;
  videosConfig: SwiperOptions;
  allHardwares: any[] = [];
  hardwares: any[] = [];
  products = [];
  cart = [];
  cartItemCount: BehaviorSubject<number>;
  orderProducts = [];
  orders = [];
  ordersItemCount: BehaviorSubject<number>;
  
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;


  // videos: any[] = [
  //   {
  //     title: 'DIY Workshop Ideas',
  //     video: 'https://www.youtube.com/watch?v=R8-ZgmB9uZk',
  //   },
  //   {
  //     title: 'Choosing Hardware for your Kitchen',
  //     video: 'https://www.youtube.com/watch?v=_Fg0qMVTGR8',
  //   },
  //   {
  //     title: 'INGENIOUS CONSTRUCTION IDEAS',
  //     video: 'https://www.youtube.com/watch?v=N57xhBjfkDk',
  //   }
  // ]

  // vid = 'https://www.youtube.com/watch?v=N57xhBjfkDk';

  constructor(
    public navCtrl: NavController,
    private dom: DomSanitizer,
    private api: ApiService,
    private cartService: CartService,
    private ordersService: OrdersService,
    private modalCtrl: ModalController,
    public toastController: ToastController,
    private toastr: ToastController,
    private _fireAuth: Auth,
    private _firestore: Firestore,
    private storage: StorageService,
    private router: Router,
    private authService: AuthService,
    public popoverController: PopoverController
  ) { }

  // sanitize(vid) {
  //   return this.dom.bypassSecurityTrustResourceUrl(vid);
  // }

  ngOnInit() {
    this.banners = [
      {banner: 'assets/products/1.png'},
      {banner: 'assets/products/2.png'},
      {banner: 'assets/products/3.png'},
      {banner: 'assets/products/4.png'},
      {banner: 'assets/products/5.png'},
    ];
    this.categories = this.api.categories;
    this.promos = this.api.promos;
    const sellers = [...this.api.sellers];
    this.sellers = sellers;
    //.sort((a,b) => parseInt(b.id) -parseInt(a.id));

    this.products = this.cartService.getProducts();
    this.orderProducts = this.ordersService.getOrderProducts();
    this.cart = this.cartService.getCart();
    this.orders = this.ordersService.getOrders();
    this.cartItemCount = this.cartService.getCartItemCount();
    this.ordersItemCount = this.ordersService.getOrdersItemCount();
  }

  sort() {
    this.products.sort((a,b) => parseInt(b.id) -parseInt(a.id));
  }
  ngAfterContentChecked() {
    this.bannerConfig = {
      slidesPerView: 1.2,
      spaceBetween: 10,
      centeredSlides: true,
      initialSlide: this.banners?.length > 1 ? 1 : 0,
      autoplay: {
        delay: 3000
      },
      pagination: { clickable: true }
    };
    this.categoryConfig = {
      slidesPerView: 3.5
    };
    this.hardwareConfig = {
      slidesPerView: 1.1
    };
    this.videosConfig = {
      slidesPerView: 1.1
    };
  }

  async addedToCartToast() {
    const toast = await this.toastController.create({
      message: "Added to cart!",
      color: 'warning',
      duration: 2000
    });
    toast.present();
  }

  async addedToOrdersToast() {
    const toast = await this.toastController.create({
      message: "Added to orders!",
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

  doRefresh(ev) {
    setTimeout(() => {
      ev.target.complete();
    }, 2000)
  }
  updateSearch(query?) {
    if(query) this.query = query;
    this.searchBar = true;
    // get hardware data
    this.hardwares = this.allHardwares.filter(x => {
      const data = x.cuisines.find(z => z == this.query);
      console.log('data: ', data);
      if(data) return true;
    });
    console.log('update hardware data: ', this.hardwares);
  }
  onInputQuery() {
    console.log('input query: ', this.query);
    if(this.query.length > 0) {
      this.searchBtn = true;
    } else {
      this.searchBtn = false;
    }
  }

  toggleSearch(val?) {
    if(val) {
      this.query = '';
      this.onInputQuery();
    }
    this.searchBar = !this.searchBar;
  }

  addToCart(product) {
    this.animateCSS('tada');
    this.cartService.addProduct(product);
  }

  addToOrder(order) {
    this.ordersService.addOrder(order);
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
  
  // async logout() {
  //   try {
  //     await signOut(this._fireAuth);
  //     await this.storage.removeStorage(user_key);
  //     return true;
  //   } catch(e) {
  //     throw(e);
  //   }
  // }

  signOut()
  {
    this.authService.logout().then(()=> {
      this.router.navigate(['/auth-screen']);
    })
  }


  async logoutToast() {
    const toast = await this.toastController.create({
      color: 'primary',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'person',
          text: 'My Account',
          role: 'cancel',
          handler: () => {
            console.log('My Account clicked');
          }
        }, 
        {
          icon: 'close-circle-outline',
          side: 'start',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        },
        {
          text: 'Sign Out',
          icon: 'log-out-outline',
          role: 'Signing out',
          handler: () => {
            this.toast('You have been signed out of your account.', 'danger');
            this.signOut();
            console.log('You have been logged out of your account.');
            
          }
          
        }
      ]
    });
    await toast.present();
    const { role } = await toast.onDidDismiss();
    console.log('...', role);
    
  }

  async videos() {
    this.router.navigateByUrl('/videos', { replaceUrl: true });
  }

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
  
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  enterAnimation: AnimationBuilder;
  leaveAnimation: AnimationBuilder;
}
