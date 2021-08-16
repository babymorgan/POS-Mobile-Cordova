export class LocalDataConfig {
    configUsingLocal: boolean = false;
    productUsingLocal: boolean = false;
    orderUsingLocal: boolean = false;
    constructor() {

    }
}

export class NewCustomer {
    ID: string|number;
    Name: string;
}

export class PrinterSetting
{
    ID : number;
    Name : string;
    Type : PrinterType;
    Receipt: boolean;
    Order: boolean;
    MaxLength : number;
    IPAddress : string;
    Port : number;
    CategoryName : string;
    NumberOfCopiesReceipt  : number;
    NumberOfCopiesOrder  : number;
    Cut:boolean;
    Eject:boolean;
    OrderPrintType  : OrderPrintTypeID;
    Code_Cutter : string;
    Code_Eject : string;
    paperwidth : number;
    constructor()
    {
        this.Name = "";
        this.Type = PrinterType.Standard;
        this.Receipt = true;
        this.Order = false;
        this.MaxLength = 32;
        this.NumberOfCopiesReceipt  = 1;
        this.NumberOfCopiesOrder = 1;
        this.Cut = false;
        this.Eject = false;
        this.OrderPrintType = OrderPrintTypeID.Park;
        this.Code_Cutter = "1D564200";
        this.Code_Eject = "1B700019FA";
        this.paperwidth = 58;
        
    }
}

export enum PrinterType
{
    Standard =1 ,
    MPop = 2,
    Network = 3
}
export enum OrderPrintTypeID
{
    Park =1 ,
   Payment=2
}
export enum PrintType 
{
    Receipt = 1,
    Park = 2,
    PackingSlip = 3
}

export class FailedPrint
{
    PrintType : PrinterType;
    Setting : PrinterSetting;
    config : any;
    template : any;
    data : any;
}