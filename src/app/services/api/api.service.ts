import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  allHardwares = [
    {
      id: '1',
      cover: 'assets/products/6.jpg',
      name: 'Building Materials',
      cuisines: [
        'Facebricks Various',
        'Untreated Timber',
        'Cement Various',
        '& More'
      ],
      rating: 3,
      price: 'From R3.65',
      latitude: 0,
      longitude: 0
    },
    {
      id: '2',
      cover: 'assets/products/7.png',
      name: 'Gardening Tools',
      cuisines: [
        'Wheelbarrow',
        'Gardenset 3 Piece',
        'Rake Combination Leaf c/w Handle'
      ],
      rating: 5,
      price: 'From R159.00',
      availability: 'In Stock',
      expdate: '2022-06-20'
    },
    {
      id: '3',
      cover: 'assets/products/8.png',
      name: 'Handy Tools',
      cuisines: [
        'Mallet Rubber Fibre Handle',
        'Trowel Brick 300mm Sure Grip',
        'Boltcutter'
      ],
      rating: 5,
      price: 'From R109.00',
      availability: 'In Stock'
    },
    {
      id: '4',
      cover: 'assets/products/9.png',
      name: 'Power Tools',
      cuisines: [
        'Angle Grinder and Impact Drill Combo',
        'Electric Lawnmower',
        'MatWeld Welder'
      ],
      rating: 4,
      price: 'From R1 125.00',
      availability: 'In Stock'
    },
    {
      id: '5',
      cover: 'assets/products/10.png',
      name: 'Plumbing',
      cuisines: [
        'Compression Coupler',
        'Gulley Head And Grid Round',
        'Marley Pipe Systems'
      ],
      rating: 4,
      price: 'R36,00',
      latitude: 0,
      longitude: 0
    },
    {
      id: '6',
      cover: 'assets/products/17.png',
      name: 'Furniture & Built-in Cupboards',
      cuisines: [
        'HK High Gloss Two Tone Built-In Cupboard',
        'HK Aikin Sit and Stand Work Station',
        'Shovel'
      ],
      rating: 4,
      price: 'From R1 050.00'
    },
  ];
  
  categories = [      
    { id: 1, name: 'Building Materials', image: 'assets/products/6.jpg' },
    { id: 2, name: 'Gardening Tools', image: 'assets/products/7.png' },
    { id: 3, name: 'Handy Tools', image: 'assets/products/8.png' },
    { id: 4, name: 'Power Tools', image: 'assets/products/9.png' },
    { id: 5, name: 'Plumbing', image: 'assets/products/10.png' },
    { id: 6, name: 'Furniture & Built-in Cupboards', image: 'assets/products/17.png' },
  ];

  allItems = [    
    {
      category_id: "1",
      cat_name: "Building Materials",
      cover: "assets/products/18.png",
      desc: "Bricks, Blocks & Paving",
      id: "1",
      name: "Facebricks Various",
      price: 3.65,
      rating: 4,
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
      id: "2",
      name: "Untreated Timber",
      price: 91.00,
      rating: 5,
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
        id: "3",
        name: "Cement Various",
        price: 89.00,
        rating: 5,
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
        id: "4",
        name: "Wheelbarrow Concrete falcon ckd",
        price: 999.00,
        rating: 3,
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
        id: "5",
        name: "Gardenset 3 Piece",
        price: 199.00,
        rating: 4,
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
      id: "6",
      name: "Rake Combination Leaf c/w Handle",
      price: 159.00,
      rating: 2,
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
        id: "7",
        name: "Mallet Rubber Fibre Handle",
        price: 112.00,
        rating: 1,
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
        id: "8",
        name: "Trowel Brick 300mm Sure Grip",
        price: 109.00,
        rating: 3,
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
      id: "9",
      name: "Boltcutter",
      price: 549.00,
      rating: 4,
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
      id: "10",
      name: "Angle Grinder and Impact Drill Combo",
      price: 1125.00,
      rating: 3,
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
      id: "11",
      name: "Electric Lawnmower",
      price: 1399.00,
      rating: 5,
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
      id: "12",
      name: "MatWeld Welder",
      price: 3059.00,
      rating: 4,
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
      id: "13",
      name: "Compression Coupler",
      price: 36.00,
      rating: 1,
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
      id: "14",
      name: "Gulley Head And Grid Round",
      price: 49.95,
      rating: 3,
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
    id: "15",
    name: "Marley Pipe Systems",
    price: 239.00,
    rating: 5,
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
    id: "16",
    name: "HK High Gloss Two Tone Built-In Cupboard",
    price: 6050.00,
    rating: 5,
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
    id: "17",
    name: "HK Aikin Sit and Stand Work Station",
    price: 1399.00,
    rating: 5,
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
    id: "18",
    name: "HK Banstead Pedestal Draw",
    price: 1050.00,
    rating: 2,
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
    id: "19",
    name: "Concrete Building Blocks",
    price: 7.65,
    rating: 4,
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
    id: "20",
    name: "Plascon Polycell Polyfilla Interior or Exterior Crack Filler",
    price: 59.00,
    rating: 5,
    status: true,
    uid: "1",
    variation: false,
    veg: true
  },
  ];

  promos = [
    {
      id: "4",
      cover: 'assets/products/11.png',
      name: 'Power Tools',
      cuisines: [
        'Angle Grinder',
        'Electric Lawnmower',
        'MatWeld Welder'
      ],
      rating: 3,
      price: 'From R1 125.00',
      availability: 'In Stock',
      expdate: '2022-06-20',
      latitude: 0,
      longitude: 0
    },
    {
      id: "3",
      cover: 'assets/products/12.png',
      name: 'Handy Tools',
      cuisines: [
        'Mallet Rubber Fibre Hammer',
        'Trowel Brick',
        'Boltcutter'
      ],
      rating: 5,
      price: 'From R109.00',
      availability: 'Out Of Stock',
      expdate: '2022-06-20'
    },
    {
      id: "2",
      cover: 'assets/products/13.png',
      name: 'Gardening Tools',
      cuisines: [
        'Rake Combination Leaf c/w Handle',
        'Wheelbarrow',
        'Gardenset 3 Piece'
      ],
      rating: 4,
      price: 'From R159.00',
      availability: 'In Stock',
      expdate: '2022-07-01'
    },
  ];
  sellers = [
    {
      id: '1',
      cover: 'assets/products/14.png',
      name: 'Toolbox',
      cuisines: [
        'Big Jim Standard Toolbox',
        'Yellow'
      ],
      rating: 5,
      price: 'R119.99',
      availability: 'In Stock'
    },
    {
      id: '2',
      cover: 'assets/products/15.png',
      name: 'Timber Wood',
      cuisines: [
        'SA Pine Untreated',
        '(50 x 76mm x 3000mm)'
      ],
      rating: 4,
      price: 'R31.99',
      availability: 'In Stock'
    },
    {
      id: '3',
      cover: 'assets/products/16.png',
      name: 'Screws & Nuts',
      cuisines: [
        'Builders Multipack Jet-In Screws',
        '4.0mm'
      ],
      rating: 4,
      price: 'R329.99',
      availability: 'In Stock',
      latitude: 0,
      longitude: 0
    },
  ];

  videos = [
    {
      id: 1,
      title: 'DIY Workshop Ideas',
      video: 'https://www.youtube.com/watch?v=R8-ZgmB9uZk',
      cuisines: [
        'Get new great ideas for next DIY project.'
      ],
    },
    {
      id: 2,
      title: 'Choosing Hardware for your Kitchen',
      video: 'https://www.youtube.com/watch?v=_Fg0qMVTGR8',
      cuisines: [
        'Make the best choice for your comfort withe best interior designers.'
      ],
    },
    {
      id: 3,
      title: 'INGENIOUS CONSTRUCTION IDEAS',
      video: 'https://www.youtube.com/watch?v=N57xhBjfkDk',
      cuisines: [
        'Work of the most talented builders around the world with constructions on a new level.'
      ],
    }
  ]

  constructor() { }
}