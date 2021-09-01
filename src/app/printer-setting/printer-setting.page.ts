import { Component, OnInit } from '@angular/core';
import { PrintBluetoothService } from '../service/printer.service';
import { Platform } from '@ionic/angular';
import { PrintContentService } from '../service/printcontent.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-printer-setting',
  templateUrl: './printer-setting.page.html',
  styleUrls: ['./printer-setting.page.scss'],
})
export class PrinterSettingPage implements OnInit {

  bluetoothList: any = [];
  selectedPrinter: any;
  macAddress: any;
  printuse:any;

  constructor(private router: Router, public platform: Platform, private printer: PrintBluetoothService, private contentService: PrintContentService, private storage: Storage) { }

  ngOnInit() {
    this.listPrinter()
  }


  listPrinter() {
    this.printer.getBluetoothList()
      .then(resp => {
        this.bluetoothList = resp;
      });
  }

  selectPrinter(macAddress) {
    
    this.selectedPrinter = macAddress;
  }

  save() {
    let macAddress = this.selectedPrinter
    this.printuse = macAddress
    this.storage.set("printer", JSON.stringify(this.printuse))
    let testPrint = "Printer has been saved \n\n\n This is a test print \n\n\n"
    this.router.navigate(['/home/sales']).then(() => {
      window.location.reload();
    });
    this.printer.printBT(macAddress, testPrint)
  }
}


