import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
    selector: 'feed-modal',
    templateUrl: 'feed-modal.html'
})
export class FeedModal implements OnInit {

    @Input() public companyName: string;
    @Input() public message: string;
    @Input() public businessType: string;
    @Input() public address: string;
    @Input() public subject: string;
    @Input() public phoneNumber: string;

    constructor(private modalController: ModalController, private navParams: NavParams) {

    }

    ngOnInit() {

    }

    public dismiss(): void {
        this.modalController.dismiss();
    }

}