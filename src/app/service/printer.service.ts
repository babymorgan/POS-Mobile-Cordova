import { Injectable } from "@angular/core";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";
import { PrintContentBody, PrintContentService } from "../service/printcontent.service";

@Injectable({
  providedIn: 'root'
})
export class PrintBluetoothService {

  constructor(
    private bluetoothSerial: BluetoothSerial,
    public printcontent: PrintContentService,
    public body: PrintContentBody,
  
  ) {
  }
  getBluetoothList(){
    return this.bluetoothSerial.list();
  }

  connectBt(macAddress)
{
   return this.bluetoothSerial.connect(macAddress)
}

  disconnectBt() {
    return this.bluetoothSerial.disconnect();
  }

  printBT(macAddress, data_string) {

    this.connectBt(macAddress).subscribe(_ => {
      this.bluetoothSerial.write(data_string).then
        (_ => {
          this.disconnectBt()
        })
    })
  }

  //fillData(data: any, template: any, config: any, set: PrinterSetting,): string {
  //  //Fill Data Print
  //  this.body.Data = data;
  //  this.body.Template = template;
  //  this.body.Config = config;
  //  this.body.maxlength = set.MaxLength;
  //  this.body.PrinterSetting = set;
  // 
  //  let content: string = "";
  //  content += this.body.GenerateContent
  // 
  //  return content;
  //}

  //async printReceipt(data:any, template: any, config: any,printer?:PrinterSetting): Promise<any> {
  //let content: string = await this.fillData(data, template, config, printer);
  //let info = await this.setPrint(content, printer, template);
  //return info;
  //}

 
}





