import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GelirGiderIcerikPage } from './gelir-gider-icerik.page';

const routes: Routes = [
  {
    path: '',
    component: GelirGiderIcerikPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GelirGiderIcerikPageRoutingModule {}
