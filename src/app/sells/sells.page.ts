import { Component, OnInit } from '@angular/core';
import { SalesService } from '../service/sales.service';
import { PaymentService } from '../service/payment.service';
import { ItemModal } from './item-modal/item-modal';
import { ModalController, AlertController } from '@ionic/angular';
import { cartItemModel, cartModel,invoiceStatus } from '../models/cart.model';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CustomerService } from '../service/customer.service';
import { PrintLineService } from '../service/printline.service';
import { PrintBluetoothService } from '../service/printer.service';



@Component({
  selector: 'app-sells',
  templateUrl: './sells.page.html',
  styleUrls: ['./sells.page.scss'],
})
export class SellsPage implements OnInit {

  params;

  //Quickey
  quickyItems: any[] = [];
  quickySubItems;
  subItemName;
  selectedItem;
  selectedCustomer;
  items
  paymentMethod: any;
  sellComplete: boolean = false;
  cart: cartModel;
  selectedIndex;
  paymentIndex = -1;
  sellCompleteInfo;
  customerList;
  dropdownList = [];
  user;
  user_id;
  content: string = "";
  selectedPrinter: any;
  maxlength: number;

  compareWith(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  
  ddSelectedItem = []



  constructor(private customerService: CustomerService , private printline: PrintLineService,private cashierService: SalesService, private paymentService:PaymentService, private route: ActivatedRoute, private modalController: ModalController, private alertController: AlertController, private storage: Storage, 
   private printer:PrintBluetoothService) {

    this.storage.get('user').then((result) => {
      this.user = JSON.parse(result)
      this.user_id = this.user.id
    });

     

    let queryString = this.route.snapshot.params;
    this.params = queryString.id;

    if (this.params) {
      this.cashierService.GetInvoice(this.params)
        .subscribe(returnVal => {
          this.cart = returnVal.data;
          this.sellComplete = true;
        })
    }
    else {
      this.cart = new cartModel();
      this.clearCartItems();
      this.generateInvoiceNumber();
    }

    this.paymentService.GetAllPayment().subscribe(
      res => {
        this.paymentMethod = res.data;
      }
    )

    this.customerService.GetAllCustomer().subscribe(
      res => {
        
        res.data.forEach(element => {
          let cust = {
            key: element.id,
            value: element.name
          }
          this.dropdownList.push(cust);
        });
      }
    )

   

  }

  ngOnInit() {
    this.cart = new cartModel();
    this.clearCartItems();
    this.generateInvoiceNumber();
    this.cart.items = [];
    this.ddSelectedItem = []



    this.storage.get("quickKeys").then((val) => {

      let items = JSON.parse(val)
      if (items) {
        items.forEach(element => {
          if (element.type == 2){
            this.quickyItems = element.items
          }
        });
      }
    });
  }

  generateInvoiceNumber() {
    let digits = Math.floor(Math.random() * 9000000000) + 1000000000;
    this.cart.number = digits.toString().substring(0, 3) + "." + digits.toString().substring(3, 6) + "." + digits.toString().substring(5, 8);
  }

  getVariantQuickyItems(item) {
    this.subItemName = item.product_name;
    this.quickySubItems = item.child;
  }

  backToQuickyItems() {
    this.quickySubItems = null;
  }

  onItemSelected(item) {
    let indx =  this.cart.items.findIndex(idx => idx.variant_id === item.id)
    if (indx > -1) {
      this.selectedItem = this.cart.items[indx];
      this.createItemModal(this.selectedItem, true);
    }
    else {
   
        this.selectedItem = item;
        this.createItemModal(this.selectedItem);
    }
  }

  async createItemModal(item, edit = false) {
    let name = edit ? item.name : item.variantName != 'default' ? item.productName
      + " " + item.variantName : item.productName

    const modal = await this.modalController.create({
      component: ItemModal,
      componentProps: {
        'variantID': item.id,
        'variantPrice': item.price,
        'variantName': item.name,
        'quantity': item.quantity ? item.quantity : 1,
        'notes': item.notes ? item.notes : "",
        'variantCode': item.code,
        'totalItemPrice': edit ? item.total : 0
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.addToCart(data.data);
      }
    })

    await modal.present();
  }

  addToCart(item) {
    let indx = this.cart.items ? this.cart.items.findIndex(idx => idx.variant_id === item.id) : -1;

    if (indx > -1) {
      this.cart.items[indx].quantity = item.quantity;
      this.cart.items[indx].total_price = item.totalPrice;
      this.cart.items[indx].base_price = this.cart.items[indx].total_price;
      this.cart.items[indx].notes = item.notes;
    }
    else {
      let temp: cartItemModel = new cartItemModel();
      temp.name = item.name;
      temp.variant_id = item.id
      temp.price = item.variantPrice
      temp.quantity = item.quantity;
      temp.total_price = item.totalPrice;
      temp.base_price = temp.total_price;
      temp.notes = item.notes;
      temp.category_id = this.selectedItem.category_id
      this.cart.items.push(temp);
    }
    this.getTotal();
  }

  getTotal() {
    this.cart.status = 0;
    this.cart.sub_total = 0;
    this.cart.total_quantity = 0;
    this.cart.items.forEach((item: cartItemModel) => {
      this.cart.sub_total += item.total_price;
      this.cart.total_quantity += item.quantity;
    })

    if (this.cart.discount) {
      this.cart.discount_amount = this.cart.discount / 100 * this.cart.sub_total;
    }

    let total = this.cart.sub_total - this.cart.discount_amount;
    if (this.cart.tax) {
      this.cart.tax_amount = this.cart.tax / 100 * total;
    }

    this.cart.total = total + this.cart.tax_amount;
  }

  clearCartItems() {
    this.cart.items = [];
    this.getTotal();
    this.sellComplete = false;
  }

  viewCart() {
    this.cart.payment_id = this.paymentMethod[0].id;
    this.sellComplete = true;
    
  }

  backToMenu() {
    this.sellComplete = false;
  }

  deleteMenu(index) {
    this.cart.items.splice(index, 1);
    this.getTotal();
  }

  getDiscount(event: any) {
    setTimeout(() => {
      this.cart.discount = +event.target.value;
      if (this.cart.discount) {
        this.cart.discount_amount  = this.cart.discount / 100 * this.cart.sub_total;
      }

      let total = this.cart.sub_total - this.cart.discount_amount;
      if (this.cart.tax) {
        this.cart.tax_amount = this.cart.tax / 100 * total;
      }

      this.cart.total = total + this.cart.tax_amount;
    }, 500);

  }

  getTax(event: any) {
    this.cart.tax = +event.target.value;
    if (this.cart.discount) {
      this.cart.discount_amount = this.cart.discount / 100 * this.cart.sub_total;
    }

    let total = this.cart.sub_total - this.cart.discount_amount;
    if (this.cart.tax) {
      this.cart.tax_amount = this.cart.tax / 100 * total;
    }

    this.cart.total = total + this.cart.tax_amount;
  }

  onSubmit() {
    this.cart.date = new Date();
    this.cart.status = invoiceStatus.Order;
    this.cart.user_id = this.user_id;

    this.cashierService.SubmitCartOrder(this.cart).subscribe(res => {
      this.sellCompleteInfo = res.data;
      let message = "Invoice #" + this.sellCompleteInfo.number + " is created successfully.";
      let status = "Unpaid Invoice";
      this.createSuccessMessage(message, status);
    })

   


  }

  async createSuccessMessage(message, status) {
    const alert = await this.alertController.create({
      header: status,
      message: message,
      buttons: ['OK']
    });

    alert.onDidDismiss().then(() => {
      this.ngOnInit();
    })

    await alert.present();
    return;
  }

  selectPayment(id) {
    this.cart.payment_id = id;
 
  }

  selectCustomer(value) {

    this.cart.contact_id = value
 
  }




  onPaymentConfirmation() {
    this.cart.payment_status = 2;
    this.cart.status = invoiceStatus.Receipt;
    this.cart.contact_id
    this.cart.date = new Date();
    this.cart.discount = parseInt(this.cart.discount.toString());
    this.cart.tax = parseInt(this.cart.tax.toString());
    this.cart.user_id = this.user_id;
    this.cart.payment_id = this.paymentMethod[0].id;

    this.cashierService.SubmitCart(this.cart).subscribe(res => {
      this.sellCompleteInfo = res.data;
      let message = "Invoice #" + this.sellCompleteInfo.number + " is created successfully.";
      let status = "Paid Invoice";
      this.createSuccessMessage(message, status);
    }, async (err) => {
      const alert = await this.alertController.create({
        header: "Failed",
        message: "Failed in creating invoice",
        buttons: ['OK']
      });
    })
  }

  onPrint(){
    this.GenerateContent()
    this.storage.get("printer").then((val)=>{
      val = this.selectedPrinter
      let content = this.content
      this.printer.printBT(this.selectedPrinter, content)
      console.log(this.content)
      console.log(this.selectedPrinter)
    })  
  }

  LongString(text: string): string {
    let split: string[] = [];
    let output: string = "";
    split = text.split("\n");
    split.forEach(s => {
        output += this.printline.AppendLongStringCenter(s);
    });

    return output;
  }


  Header(): string {
    let invoiceNumber = this.cart.number
    this.printline.Init(this.maxlength);
    let header: string = "";
    header += this.printline.AppendCenter("*****");
      header += this.printline.AppendCenter(invoiceNumber + "\n");

      
    return header;
  }

  ContacInfo(): string {
    let info: string = "";
    if (this.cart.contact_id) {
      info += this.LongString(this.cart.contact_id);
    }
    return info;
  }

  //item() {
  //  let itemsText: string = "";
  //  this.cart.items.forEach((item)=>{
  //    let qty 
  //    qty = item.quantity.toString
//
  //    let discount
  //    discount = item.discount_amount.toString
//
  //    let total
  //    total = item.total_price.toString
//
  //    itemsText += this.printline.AppendLeft(item.name) + "\n";
  //    itemsText += this.printline.AppendLine(qty + discount, total);
  //
  //      itemsText += this.LineSeparator();
  //     
  // 
  //    return itemsText;
  //  })
  //}


  LineSeparator(): string {
    return this.printline.Separator();
  }
  
  GenerateContent(): string {
    this.storage.get("printer").then((val)=>{
      val = this.selectedPrinter
    })
    let content: string = "";

    content += this.Header(); // Generate  Template Name & Address
    content += this.ContacInfo(); //Generate  Contact Info
    this.content = content
    return content;
  
  }



//  printReceipt(){
//    let item = this.cart.items
//
//      item.forEach(element => {
//      let displayName = element.name
//      let displayPrice = element.price
//
//    let separator  = "--------------------------------\n";
//    let tanggal = "Tanggal        :\n";
//    let noInvoice = "No Invoice   :"+ JSON.stringify(this.cart.date)+"\n";
//    let customer = "Nama           :" + JSON.stringify(this.cart.contact_id) + "\n\n";
//    let header = "    Item              Biaya\n";
//    let items = "   "+JSON.stringify(displayName)+"          "+ JSON.stringify(displayPrice) + "\n\n"
//    let total = "     Total         Rp. 9.000,-\n\n\n";
//  
//  this.content =  + tanggal + noInvoice + customer + separator + header + separator + item + separator + total;
//
//  
//});

   // let invoicePage = this.content
   //
   //  this.printer.printBT(this.selectedPrinter,invoicePage,)
    //}
}
