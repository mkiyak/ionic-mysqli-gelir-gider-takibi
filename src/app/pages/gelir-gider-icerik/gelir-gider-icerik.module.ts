import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GelirGiderIcerikPageRoutingModule } from './gelir-gider-icerik-routing.module';

import { GelirGiderIcerikPage } from './gelir-gider-icerik.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GelirGiderIcerikPageRoutingModule
  ],
  declarations: [GelirGiderIcerikPage]
})
export class GelirGiderIcerikPageModule {}
