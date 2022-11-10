import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api/api.service';

export interface Product {
  id: number;
  name: string;
  cover: string;
  cat_name: string;
  desc: string;
  price: number;
  rating: number;
  amount: number;
  category_id: string;
  status: boolean;
  uid: string;
  variation: boolean;
  veg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private data = [
    {
      category_id: "1",
      cat_name: "Building Materials",
      cover: "assets/products/18.png",
      desc: "Bricks, Blocks & Paving",
      id: 0,
      name: "Facebricks Various",
      price: 3.65,
      rating: 4,
      amount: 1,
      status: true,
      uid: "1",
      variation: false,
      veg: true
    },
    {
      category_id: "1",
      cat_name: "Building Materials",
      cover: "assets/products/41.png",
      desc: "Structural graded timber (50 x 152 x 3600mm)",
      id: 1,
      name: "Untreated Timber",
      price: 91.00,
      rating: 5,
      amount: 1,
      status: true,
      uid: "1",
      variation: false,
      veg: true
    },
    {
        category_id: "1",
        cat_name: "Building Materials",
        cover: "assets/products/22.png",
        desc: "Build it, Sephaku, NPC, Lafarge, PPC & Afrisam 50kg",
        id: 2,
        name: "Cement Various",
        price: 89.00,
        rating: 5,
        amount: 1,
        status: true,
        uid: "1",
        variation: false,
        veg: false
    },
    {
        category_id: "2",
        cat_name: "Gardening Tools",
        cover: "assets/products/19.png",
        desc: "Lasher Tools | Completely Knocked Down",
        id: 3,
        name: "Wheelbarrow Concrete falcon ckd",
        price: 999.00,
        rating: 3,
        amount: 1,
        status: true,
        uid: "2",
        variation: false,
        veg: true
    },
    {
        category_id: "2",
        cat_name: "Gardening Tools",
        cover: "assets/products/23.png",
        desc: "Garden 3, Poly Handlel",
        id: 4,
        name: "Gardenset 3 Piece",
        price: 199.00,
        rating: 4,
        amount: 1,
        status: true,
        uid: "2",
        variation: false,
        veg: false
    },    
    {
      category_id: "2",
      cat_name: "Gardening Tools",
      cover: "assets/products/24.png",
      desc: "Length: 1460mm, Polyprepylene head, steel handle, ribs under tines for extra strength.",
      id: 5,
      name: "Rake Combination Leaf c/w Handle",
      price: 159.00,
      rating: 2,
      amount: 1,
      status: true,
      uid: "2",
      variation: false,
      veg: true
    },
    {
        category_id: "3",
        cat_name: "Handy Tools",
        cover: "assets/products/28.png",
        desc: "Lasher Tools | Poly Handle, 340mm",
        id: 6,
        name: "Mallet Rubber Fibre Handle",
        price: 112.00,
        rating: 1,
        amount: 1,
        status: true,
        uid: "3",
        variation: false,
        veg: false
    },
    {
        category_id: "3",
        cat_name: "Handy Tools",
        cover: "assets/products/27.png",
        desc: "300mm, Poly Handle",
        id: 7,
        name: "Trowel Brick 300mm Sure Grip",
        price: 109.00,
        rating: 3,
        amount: 1,
        status: true,
        uid: "3",
        variation: false,
        veg: true
    },
    {
      category_id: "3",
      cat_name: "Handy Tools",
      cover: "assets/products/29.png",
      desc: "Mts H/T Forged 600mm",
      id: 8,
      name: "Boltcutter",
      price: 549.00,
      rating: 4,
      amount: 1,
      status: true,
      uid: "3",
      variation: false,
      veg: true
    },
    {
      category_id: "4",
      cat_name: "Power Tools",
      cover: "assets/products/30.png",
      desc: "Bosch Professional, 500watt/650watt",
      id: 9,
      name: "Angle Grinder and Impact Drill Combo",
      price: 1125.00,
      rating: 3,
      amount: 1,
      status: true,
      uid: "4",
      variation: false,
      veg: true
    },
    {
      category_id: "4",
      cat_name: "Power Tools",
      cover: "assets/products/31.png",
      desc: "Roybi | 1200W, 320mm",
      id: 10,
      name: "Electric Lawnmower",
      price: 1399.00,
      rating: 5,
      amount: 1,
      status: true,
      uid: "4",
      variation: false,
      veg: true
    },
    {
      category_id: "4",
      cat_name: "Power Tools",
      cover: "assets/products/32.png",
      desc: "A/C 220V 200A with Kit",
      id: 11,
      name: "MatWeld Welder",
      price: 3059.00,
      rating: 4,
      amount: 1,
      status: true,
      uid: "4",
      variation: false,
      veg: true
    },
    {
      category_id: "5",
      cat_name: "Plumbing",
      cover: "assets/products/33.png",
      desc: "Pipes & Fittings | PVC 20mm",
      id: 12,
      name: "Compression Coupler",
      price: 36.00,
      rating: 1,
      amount: 1,
      status: true,
      uid: "5",
      variation: false,
      veg: false
  },
  {
      category_id: "5",
      cat_name: "Plumbing",
      cover: "assets/products/34.png",
      desc: "Wastes, Traps & Overflows",
      id: 13,
      name: "Gulley Head And Grid Round",
      price: 49.95,
      rating: 3,
      amount: 1,
      status: true,
      uid: "5",
      variation: false,
      veg: true
  },
  {
    category_id: "5",
    cat_name: "Plumbing",
    cover: "assets/products/35.png",
    desc: "PVC SV Junction Single Plain 135° X 110mm, White",
    id: 14,
    name: "Marley Pipe Systems",
    price: 239.00,
    rating: 5,
    amount: 1,
    status: true,
    uid: "5",
    variation: false,
    veg: true
  },
  {
    category_id: "6",
    cat_name: "Furniture & Built-in Cupboards",
    cover: "assets/products/37.png",
    desc: "1820 x 500 x 2100mm",
    id: 15,
    name: "HK High Gloss Two Tone Built-In Cupboard",
    price: 6050.00,
    rating: 5,
    amount: 1,
    status: true,
    uid: "6",
    variation: false,
    veg: true
  },
  {
    category_id: "6",
    cat_name: "Furniture & Built-in Cupboards",
    cover: "assets/products/38.png",
    desc: "Brown",
    id: 16,
    name: "HK Aikin Sit and Stand Work Station",
    price: 1399.00,
    rating: 5,
    amount: 1,
    status: true,
    uid: "6",
    variation: false,
    veg: true
  },
  {
    category_id: "6",
    cat_name: "Furniture & Built-in Cupboards",
    cover: "assets/products/40.png",
    desc: "450 x 450 x 630mm",
    id: 17,
    name: "HK Banstead Pedestal Draw",
    price: 1050.00,
    rating: 2,
    amount: 1,
    status: true,
    uid: "6",
    variation: false,
    veg: true
  },
  {
    category_id: "1",
    cat_name: "Building Materials",
    cover: "assets/products/20.png",
    desc: "160mm",
    id: 18,
    name: "Concrete Building Blocks",
    price: 7.65,
    rating: 4,
    amount: 1,
    status: true,
    uid: "1",
    variation: false,
    veg: true
  },
  {
    category_id: "1",
    cat_name: "Building Materials",
    cover: "assets/products/21.png",
    desc: "2kg, Waterproofing & Sealants",
    id: 19,
    name: "Plascon Polycell Polyfilla Interior or Exterior Crack Filler",
    price: 59.00,
    rating: 5,
    amount: 1,
    status: true,
    uid: "1",
    variation: false,
    veg: true
  },
  ];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(
  ) {}


  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}

