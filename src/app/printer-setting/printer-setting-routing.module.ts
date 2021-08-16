import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrinterSettingPage } from './printer-setting.page';

const routes: Routes = [
  {
    path: '',
    component: PrinterSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrinterSettingPageRoutingModule {}
