import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { cartModel } from 'src/app/models/cart.model';

@Component({
    selector: 'payment-detail',
    templateUrl: 'payment-detail.html'
})
export class PaymentDetail implements OnInit {

    @Input() invoice: cartModel;

    constructor(private modalController: ModalController){}
    
    ngOnInit() {
    }

    public dismiss(): void {
        this.modalController.dismiss();
    }
}