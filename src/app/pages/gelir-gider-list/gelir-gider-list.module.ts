import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GelirGiderListPageRoutingModule } from './gelir-gider-list-routing.module';

import { GelirGiderListPage } from './gelir-gider-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GelirGiderListPageRoutingModule
  ],
  declarations: [GelirGiderListPage]
})
export class GelirGiderListPageModule {}
