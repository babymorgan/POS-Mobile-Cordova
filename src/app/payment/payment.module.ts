import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { PaymentModal } from './payment-modal/payment-modal';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  entryComponents: [PaymentModal],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule,
    SharedModule
  ],
  declarations: [PaymentPage, PaymentModal]
})
export class PaymentPageModule {}
