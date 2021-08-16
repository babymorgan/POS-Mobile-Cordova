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

  constructor(private router: Router, public platform: Platform, private printer: PrintBluetoothService, private contentService: PrintContentService, private storage: Storage) { }

  ngOnInit() {
    this.listPrinter
  }


  listPrinter() {
    this.printer.getBluetoothList()
      .then(resp => {
        this.bluetoothList = resp;
      });
  }

  selectPrinter(macAddress) {
    this.selectedPrinter = macAddress;
    this.macAddress = macAddress
  }

  save() {
    this.storage.set("printer", this.macAddress)
    this.router.navigate(['/tabs/sells']);
  }

}


