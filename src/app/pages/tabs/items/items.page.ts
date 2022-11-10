import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  id: any;
  hardware: any;
  categories: any[] = [];
  items: any[] = [];
  promos: any[] = [];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private api: ApiService
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
    this.hardware = this.api.allHardwares.find(x => x.id == this.id);
    this.promos = this.api.promos;
    this.categories = this.api.categories;
    this.items = [...this.api.allItems].filter(x => x.uid == this.id);
    console.log(this.items);
  }

  getCuisines(data) {
    return data.join(', ');
  }
}
