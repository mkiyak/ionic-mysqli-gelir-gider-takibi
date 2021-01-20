import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GelirGiderEditPageRoutingModule } from './gelir-gider-edit-routing.module';

import { GelirGiderEditPage } from './gelir-gider-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GelirGiderEditPageRoutingModule
  ],
  declarations: [GelirGiderEditPage]
})
export class GelirGiderEditPageModule {}
