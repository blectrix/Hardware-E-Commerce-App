import { AfterContentChecked, Component, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions, Autoplay, Pagination, EffectCoverflow } from 'swiper';

export const user_key = 'siyeshe_holdings_user_id';

SwiperCore.use([Autoplay, Pagination, EffectCoverflow]);

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, AfterContentChecked {

  banners: any[] = [];
  bannerConfig: SwiperOptions;
  query: string;
  searchBtn: boolean;
  searchBar: boolean;
  categories: any[] = [];
  allHardwares: any[] = [];
  hardwares: any[] = [];
  isLoading: boolean;
  item = {
    // icon: 'search-outline',
    image: 'assets/imgs/sad.png',
    color: 'primary',
    title: 'Sorry!',
    subTitle: 'The item you were looking for was not found'
  };
  

  constructor() { }

  ngOnInit() {

    this.banners = [
      {banner: 'assets/products/1.png'},
      {banner: 'assets/products/2.png'},
      {banner: 'assets/products/3.png'},
      {banner: 'assets/products/4.png'},
      {banner: 'assets/products/5.png'},
    ];

    this.categories = [      
      { id: 1, cover: 'assets/products/6.jpg', name: 'Building Materials' },
      { id: 2, cover: 'assets/products/7.png', name:'Gardening Tools' },
      { id: 3, cover: 'assets/products/8.png', name: 'Handy Tools'},
      { id: 4, cover: 'assets/products/9.png', name: 'Power Tools'},
      { id: 5, cover: 'assets/products/10.png', name: 'Plumbing'},
      { id: 6, cover: 'assets/products/17.png', name: 'Furniture & Built-in Cupboards'},
    ];
    
    this.allHardwares = [
      {
        cat_name: 'Building Materials',
        cover: 'assets/products/18.png',
        cuisines: ['Bricks, Blocks & Paving'],
        id: '1',
        name: 'Facebricks Various',
        price: 'R3.65',
        rating: 4,
        availability: 'In Stock'
      },
      {
        cat_name: 'Building Materials',
        cover: 'assets/products/41.png',
        cuisines: ['Structural graded timber (50 x 152 x 3600mm)'],
        id: '2',
        name: 'Untreated Timber',
        price: 'R91.00',
        rating: 5,
        availability: 'In Stock'
      },
      {
          cat_name: 'Building Materials',
          cover: 'assets/products/22.png',
          cuisines: ['Build it, Sephaku, NPC, Lafarge, PPC & Afrisam 50kg'],
          id: '3',
          name: 'Cement Various',
          price: 'R89.00',
          rating: 5,
          availability: 'In Stock'
      },
      {
          cat_name: 'Gardening Tools',
          cover: 'assets/products/19.png',
          cuisines: ['Lasher Tools | Completely Knocked Down'],
          id: '4',
          name: 'Wheelbarrow Concrete falcon ckd',
          price: 'R999.00',
          rating: 3,
          availability: 'In Stock',
          expdate: '30 June 2022'
      },
      {
          cat_name: 'Gardening Tools',
          cover: 'assets/products/23.png',
          cuisines: ['Garden 3, Poly Handlel'],
          id: '5',
          name: 'Gardenset 3 Piece',
          price: 'R199.00',
          rating: 4,
          availability: 'Out Of Stock',
          expdate: '30 June 2022'
      },    
      {
        cat_name: 'Gardening Tools',
        cover: 'assets/products/24.png',
        cuisines: ['Length: 1460mm, Polyprepylene head, steel handle, ribs under tines for extra strength.'],
        id: '6',
        name: 'Rake Combination Leaf c/w Handle',
        price: 'R159.00',
        rating: 2,
        availability: 'In Stock'
      },
      {
          cat_name: 'Handy Tools',
          cover: 'assets/products/28.png',
          cuisines: ['Lasher Tools | Poly Handle, 340mm'],
          id: '7',
          name: 'Mallet Rubber Fibre Handle',
          price: 'R112.00',
          rating: 1,
          availability: 'Out Of Stock',
          expdate: '30 June 2022'
      },
      {
          cat_name: 'Handy Tools',
          cover: 'assets/products/27.png',
          cuisines: ['300mm, Poly Handle'],
          id: '8',
          name: 'Trowel Brick 300mm Sure Grip',
          price: 'R109.00',
          rating: 3,
          expdate: '30 June 2022'
      },
      {
        cat_name: 'Handy Tools',
        cover: 'assets/products/29.png',
        cuisines: ['Mts H/T Forged 600mm'],
        id: '9',
        name: 'Boltcutter',
        price: '549.00',
        rating: 4,
        availability: 'In Stock'
      },
      {
        cat_name: 'Power Tools',
        cover: 'assets/products/30.png',
        cuisines: ['Bosch Professional, 500watt/650watt'],
        id: '10',
        name: 'Angle Grinder and Impact Drill Combo',
        price: 'R1125.00',
        rating: 3,
        availability: 'In Stock'
      },
      {
        cat_name: 'Power Tools',
        cover: 'assets/products/31.png',
        cuisines: ['Roybi | 1200W, 320mm'],
        id: '11',
        name: 'Electric Lawnmower',
        price: 'R1399.00',
        rating: 5,
        availability: 'In Stock',
        expdate: '30 June 2022'
      },
      {
        cat_name: 'Power Tools',
        cover: 'assets/products/32.png',
        cuisines: ['A/C 220V 200A with Kit'],
        id: '12',
        name: 'MatWeld Welder',
        price: 'R3059.00',
        rating: 4,
        availability: 'In Stock',
        expdate: '30 June 2022'
      },
      {
        cat_name: 'Plumbing',
        cover: 'assets/products/33.png',
        cuisines: ['Pipes & Fittings | PVC 20mm'],
        id: '13',
        name: 'Compression Coupler',
        price: 'R36.00',
        rating: 1,
        availability: 'In Stock'
    },
    {
        cat_name: 'Plumbing',
        cover: 'assets/products/34.png',
        cuisines: ['Wastes, Traps & Overflows'],
        id: '14',
        name: 'Gulley Head And Grid Round',
        price: 'R49.95',
        rating: 3,
        availability: 'Out Of Stock'
    },
    {
      cat_name: 'Plumbing',
      cover: 'assets/products/35.png',
      cuisines: ['PVC SV Junction Single Plain 135° X 110mm, White'],
      id: '15',
      name: 'Marley Pipe Systems',
      price: 'R239.00',
      rating: 5,
      availability: 'In Stock'
    },
    {
      cat_name: 'Furniture & Built-in Cupboards',
      cover: 'assets/products/37.png',
      cuisines: ['1820 x 500 x 2100mm'],
      id: '16',
      name: 'HK High Gloss Two Tone Built-In Cupboard',
      price: 'R6050.00',
      rating: 5,
      availability: 'In Stock'
    },
    {
      cat_name: 'Furniture & Built-in Cupboards',
      cover: 'assets/products/38.png',
      cuisines: ['Brown'],
      id: '17',
      name: 'HK Aikin Sit and Stand Work Station',
      price: 'R1399.00',
      rating: 5,
      availability: 'Out Of Stock'
    },
    {
      cat_name: 'Furniture & Built-in Cupboards',
      cover: 'assets/products/40.png',
      cuisines: ['450 x 450 x 630mm'],
      id: '18',
      name: 'HK Banstead Pedestal Draw',
      price: 'R1050.00',
      rating: 2,
      availability: 'In Stock'
    },
    {
      
      cat_name: 'Building Materials',
      cover: 'assets/products/20.png',
      cuisines: ['160mm'],
      id: '19',
      name: 'Concrete Building Blocks',
      price: 'R7.65',
      rating: 4,
      availability: 'In Stock'
    },
    {
      
      cat_name: 'Building Materials',
      cover: 'assets/products/21.png',
      cuisines: ['2kg, Waterproofing & Sealants'],
      id: '20',
      name: 'Plascon Polycell Polyfilla Interior or Exterior Crack Filler',
      price: 'R59.00',
      rating: 5,
      availability: 'In Stock' 
    },
    ];
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
  }

  updateSearch(query?) {
    if(query) this.query = query;
    this.searchBar = true;
    //  get hardware data
    this.isLoading = true;
    setTimeout(() => {
      this.hardwares = this.allHardwares.filter(x => {
      return (x.cat_name).toLowerCase().includes(this.query.toLowerCase()) || (x.name).toLowerCase().includes(this.query.toLowerCase())
      || x.cuisines.find(z => z.toLowerCase().includes(this.query.toLowerCase()));
    });
    console.log('update hardware data: ', this.hardwares); 
    this.isLoading = false;
    }, 1000);    
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

}
