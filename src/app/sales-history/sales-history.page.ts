import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../service/invoice.service';
import { cartModel } from '../models/cart.model';
import { FilterModel } from '../models/filter.model';
import { SalesModal } from './sales-modal/sales-modal';
import { ModalController, AlertController } from '@ionic/angular';
import { SalesService } from '../service/sales.service';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.page.html',
  styleUrls: ['./sales-history.page.scss'],
})
export class SalesHistoryPage implements OnInit {

  constructor(private invoiceService: InvoiceService, private salesService: SalesService,
    private router: Router, private modalController: ModalController, private alertController: AlertController) { }

  filter: FilterModel;
  invs: cartModel[];

  ngOnInit() {
    this.filter = new FilterModel(1, 10);
    this.salesService.getSales(this.filter).subscribe(res => {
      this.invs = res.data;
    })
  }

  async viewDetail(invoice) {
    const modal = await this.modalController.create({
      component: SalesModal,
      componentProps: {
        'invoice': invoice
      }
    });

    await modal.present();
  }

  async onDelete(id) {
    let ids = [id];
  
    const alert = await this.alertController.create({
      header: "Delete Invoice",
      message: "Do you want to delete this invoice?",
      buttons: ['Cancel', {
        text: 'OK',
        handler: async () => {
          this.invoiceService.DeleteInvoice(ids).subscribe(res => {
            this.ngOnInit()
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
    this.router.navigate(['/tabs/sales-edit', id]);
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
