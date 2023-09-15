import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tareas',
        loadChildren: () => import('../tareas/tareas.module').then(m => m.TareasPageModule)
      },
      {
        path: 'dinero',
        loadChildren: () => import('../dinero/dinero.module').then(m => m.DineroPageModule)
      },
      {
        path: 'compras',
        loadChildren: () => import('../compras/compras.module').then(m => m.ComprasPageModule)
      },
      {
        path: 'proyectos',
        loadChildren: () => import('../proyectos/proyectos.module').then(m => m.ProyectosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tareas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tareas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
