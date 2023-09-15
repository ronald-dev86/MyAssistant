import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProyectosPageRoutingModule } from './proyectos-routing.module';

import { ProyectosPage } from './proyectos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProyectosPageRoutingModule
  ],
  declarations: [ProyectosPage]
})
export class ProyectosPageModule {}
