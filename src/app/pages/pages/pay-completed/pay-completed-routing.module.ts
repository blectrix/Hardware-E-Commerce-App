import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayCompletedPage } from './pay-completed.page';

const routes: Routes = [
  {
    path: '',
    component: PayCompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayCompletedPageRoutingModule {}
