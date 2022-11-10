import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayCompletedPageRoutingModule } from './pay-completed-routing.module';

import { PayCompletedPage } from './pay-completed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayCompletedPageRoutingModule
  ],
  declarations: [PayCompletedPage]
})
export class PayCompletedPageModule {}
