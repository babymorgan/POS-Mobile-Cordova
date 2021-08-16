import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentHistoryService } from '../service/payment-history.service';
import { ModalController, AlertController } from '@ionic/angular';
import { FilterModel } from '../models/filter.model';
import { cartModel } from '../models/cart.model';
import { PaymentDetail } from './payment-detail/payment-detail';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.page.html',
  styleUrls: ['./payment-history.page.scss'],
})
export class PaymentHistoryPage implements OnInit {

  constructor(private invoiceService: PaymentHistoryService,
    private router: Router, private modalController: ModalController, private alertController: AlertController) { }

  filter: FilterModel;
  invs: cartModel[];

  ngOnInit() {
    this.filter = new FilterModel(1, 10);
    this.invoiceService.GetAll(this.filter).subscribe(res => {
      this.invs = res.data;
    })
  }

  async viewDetail(invoice) {
    const modal = await this.modalController.create({
      component: PaymentDetail,
      componentProps: {
        'invoice': invoice
      }
    });

    await modal.present();
  }

  async onDelete(id) {
    let ids = [id];
    console.log(ids);

    const alert = await this.alertController.create({
      header: "Delete Invoice",
      message: "Do you want to delete this invoice?",
      buttons: ['Cancel', {
        text: 'OK',
        handler: async () => {
          this.invoiceService.DeletePurchase(ids).subscribe(res => {
          }, async (err) => {
            const alert = await this.alertController.create({
              header: "Delete Invoice Error",
              message: "Error in delete invoice!",
              buttons: ['OK']
            });

            await alert.present();
          })
        }
      }]
    });

    await alert.present();
  }

  editInvoice(id) {
    this.router.navigate(['/tabs/payment-edit', id]);
  }

  searchInvoice(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.invs.forEach(item => {
        item.display = !item.number.toLowerCase().startsWith(query);
      });
    });
  }

}
