import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DineroPageRoutingModule } from './dinero-routing.module';

import { DineroPage } from './dinero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DineroPageRoutingModule
  ],
  declarations: [DineroPage]
})
export class DineroPageModule {}
