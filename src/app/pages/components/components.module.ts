import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HardwareComponent } from './hardware/hardware.component';
import { IonicModule } from '@ionic/angular';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';

export const components = [
  HardwareComponent,
  EmptyScreenComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [...components]
})
export class ComponentsModule { }
