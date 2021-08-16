import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrinterSettingPageRoutingModule } from './printer-setting-routing.module';

import { PrinterSettingPage } from './printer-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrinterSettingPageRoutingModule
  ],
  declarations: [PrinterSettingPage]
})
export class PrinterSettingPageModule {}
