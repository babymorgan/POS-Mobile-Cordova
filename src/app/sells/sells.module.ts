import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellsPageRoutingModule } from './sells-routing.module';

import { SellsPage } from './sells.page';

import { ItemModal } from './item-modal/item-modal';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  entryComponents: [ItemModal],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellsPageRoutingModule,
    SharedModule
  ],
  declarations: [SellsPage, ItemModal]
})
export class SellsPageModule { }
