import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { cartModel } from 'src/app/models/cart.model';

@Component({
    selector: 'sales-modal',
    templateUrl: 'sales-modal.html'
})
export class SalesModal implements OnInit {

    @Input() invoice: cartModel;

    constructor(private modalController: ModalController){}
    
    ngOnInit() {
        console.log(this.invoice);
    }

    public dismiss(): void {
        this.modalController.dismiss();
    }
}