import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DineroPage } from './dinero.page';

const routes: Routes = [
  {
    path: '',
    component: DineroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DineroPageRoutingModule {}
