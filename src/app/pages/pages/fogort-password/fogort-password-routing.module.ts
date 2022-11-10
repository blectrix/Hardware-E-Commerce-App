import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FogortPasswordPage } from './fogort-password.page';

const routes: Routes = [
  {
    path: '',
    component: FogortPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FogortPasswordPageRoutingModule {}
