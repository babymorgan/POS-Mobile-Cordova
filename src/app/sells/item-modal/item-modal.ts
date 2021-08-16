import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
    selector: 'item-modal',
    templateUrl: 'item-modal.html'
})
export class ItemModal implements OnInit {

    @Input() variantID: any;
    @Input() variantPrice: any;
    @Input() variantName: any;
    @Input() quantity: any;
    @Input() notes: any;
    @Input() variantCode: any;
    @Input() totalItemPrice: any;

    constructor(private modalController: ModalController, private navParams: NavParams) {

    }

    ngOnInit() {
        this.totalItemPrice = this.quantity * this.variantPrice;
    }


    public addMoreItem() {
        this.quantity++;
        this.totalItemPrice = this.quantity * this.variantPrice;
    }

    public removeItem() {
        if (this.quantity > 0) {
            this.quantity--;
            this.totalItemPrice = this.quantity * this.variantPrice
        }
    }

    public dismiss(): void {
        this.modalController.dismiss();
    }

    public addToCart() {
        let item = {
            id: this.variantID,
            code: this.variantCode,
            quantity: this.quantity,
            notes: this.notes,
            variantPrice: this.variantPrice,
            totalPrice: this.totalItemPrice,
            name: this.variantName
        }

        this.modalController.dismiss(item);
    }

    
}