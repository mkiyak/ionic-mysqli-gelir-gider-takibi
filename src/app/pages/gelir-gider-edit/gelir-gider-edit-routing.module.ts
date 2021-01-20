import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GelirGiderEditPage } from './gelir-gider-edit.page';

const routes: Routes = [
  {
    path: '',
    component: GelirGiderEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GelirGiderEditPageRoutingModule {}
