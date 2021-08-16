import { Injectable } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { PrintType, PrinterSetting } from '../models/localDataModels'
import { PrintLineService } from './printline.service';

let ctrl: any;

@Injectable({
    providedIn: 'root'
  })

export class PrintContentService{
    Data: any;
    Template: any;
    Config: any;
    maxlength: number;
    PrinterSetting: PrinterSetting;
    limit: number = 12;
    isBluetooth: boolean;
    constructor(
      public decimalPipe: DecimalPipe,
      public printline: PrintLineService,
      public datePipe: DatePipe
    ) {
      ctrl = this;
    }

    Header(): string {
        this.printline.Init(this.maxlength);
        let header: string = "";
        header += this.printline.AppendCenter("*****");
        return header;
      }
    
      ContacInfo(): string {
        let info: string = "";
        if (ctrl.cart.contact_id) {
          info += this.LongString(ctrl.Template.contact_id);
        }
        return info;
      }
    
      Title() {
        let title = "";
         {
          title += this.printline.AppendCenter(ctrl.Data.Title) + "\n";
         {
            title += ctrl.cart.date + "\n";
          }
    
          title += this.LineSeparator();
        }
        return title;
      }

      Item(): string {
        let itemsText: string = "";
        let quantityTotal: number | string = 0;
        if (ctrl.cart.Items) {
          ctrl.cart.Items.forEach((item: any) => {
            quantityTotal += item.Quantity;
    
            let discount: string = item.Discount ? " - " + item.Discount + "%" : "";
            discount += item.DiscountAmount ? " - " + item.DiscountAmount : "";
            let price: string = (item.Quantity > 0) ? " X " + item.UnitPrice : "";
    
            let uom = "";
    
            if (ctrl.Config) uom = ctrl.Config.PrintConfigInvoice.ItemsTable.UOMVisible ? item.Variant.UOMName : "";
            let qty: string = "";
           {
              qty = item.Quantity + " " + price;
            }
    
            let total: string = "0";
            if (item.Total != undefined) {
              total = this.decimalPipe.transform(item.Total).toString();
            }
            let iName: string = item.Variant ? item.Variant.Name : item.Name;
            let name: string = iName + (discount ? discount : "");
           {
              if (item.Quantity == 1) itemsText += this.printline.AppendLine(name, total);
              else {
                itemsText += this.printline.AppendLeft(iName) + "\n";
    
    
                itemsText += this.printline.AppendLine(qty + discount, total);
              }
            }
          });
          itemsText += this.LineSeparator();
          itemsText += this.printline.AppendTextRightLine("Qty", this.decimalPipe.transform(quantityTotal), ":");
        }
        return itemsText;
      }
    
    
      Summary(): string {
        let summaryText: string = "";
        if (ctrl.Data.AmountSummary) {
          ctrl.Data.AmountSummary.forEach((item: any) => {
            if (item.Amount) {
              //summaryText += item.Label + ": " + item.CurrencySymbol + " " + this.decimalPipe.transform(item.Amount) + "\n";
              let total: string = this.decimalPipe.transform(item.Amount);
              summaryText += this.printline.AppendTextRightLine(item.Label.replace("Discount", "Disc."), total, ":", item.CurrencySymbol);
            }
          });
        }
        return summaryText;
      }
    
      Feed(count: number): string {
        let feed: string = "";
        for (let i: number = 0; i < count; i++) {
          feed += '\n'
        }
        return feed;
      }
    
      LongString(text: string): string {
        let split: string[] = [];
        let output: string = "";
        split = text.split("\n");
       
    
        return output;
      }
    
     
      private extractTextFromHtmlTag(text: string): string[] {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = text;
    
        let result: string[] = [];
        let children = span.children;
        for (let i: number = 0; i < children.length; i++) {
          let temp: string = children[i].textContent;
          if (temp && temp.trim() != "") {
            result.push(children[i].textContent);
          }
        }
    
        return result;
      }
    
      LineSeparator(): string {
        return this.printline.Separator();
      }
    }
    
    
    
    @Injectable({
      providedIn: 'root'
    })
    export class PrintContentBody extends PrintContentService {
      GenerateContent(type: PrintType): string {
        let content: string = "";
    
        content += this.Header(); // Generate  Template Name & Address
        content += this.ContacInfo(); //Generate  Contact Info
        content += this.Title();
        content += this.Item; // Generate  Item
        content += this.Summary(); // Generate  For Summary Footer

        return content;
      }
    
}

