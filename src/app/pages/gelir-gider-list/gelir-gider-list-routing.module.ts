import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GelirGiderListPage } from './gelir-gider-list.page';

const routes: Routes = [
  {
    path: '',
    component: GelirGiderListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GelirGiderListPageRoutingModule {}
