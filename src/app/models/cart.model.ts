export class cartModel {
    id: string
    date: Date
    number: string
    items: cartItemModel[]
    sub_total: number
    total_quantity : number
    total : number
    notes: string
    payment_status: number
    payment_id : string
    created :Date
	user_id :string
	updated :Date
    updater : string
    contact_id : string
    status: invoiceStatus
    discount: number
    tax: number
    discount_amount: number
    tax_amount: number
    creator_id: string
    deliveries: cartDeliveriesModel[]
    display: Boolean
    constructor()
    {
        this.id = ""
        this.date = new Date()
        this.number = ""
        this.sub_total = 0
        this.total_quantity = 0
        this.total = 0
        this.payment_status = 0
        this.payment_id = ""
        this.created =  new Date()
        this.user_id = ""
        this.contact_id = ""
        this.status = 0
        this.tax = 0
        this.discount = 0
        this.creator_id = ""
        this.display = true
        this.discount_amount = 0
        this.tax_amount = 0
        
    }
}

export class cartItemModel  {
    variant_id: string
    name: string
    quantity: number
    price : number
    total_price: number
    base_price: number
    invoice_id: string  
    notes : string
    discount: number
    tax: number
    discount_amount: number
    tax_amount: number

    code : string
    category_id : string
    constructor(){
   
        this.variant_id = ""
        this.name = ""
        this.quantity = 0
        this.price = 0
        this.total_price = 0
        this.base_price = 0
        this.invoice_id = ""  
        this.notes = ""
        this.category_id= ""
        this.code = ""
    }
}

export class cartDeliveriesModel {
    id: string
    date: Date
    number: string
    contact_id: string
    fee: number
    notes: string
    created_at: Date
    creator_id:string
    update_at: Date
    updater_id: string
    order_id:string
    invoice: string
    items:  deliveriesItemModel[]
    user_id: string
    constructor(){
        this.id = ""
        this.date = new Date()
        this.number = ""
        this.contact_id = ""
        this.fee = 0
        this.notes = ""
        this.created_at = new Date()
        this.creator_id = ""
        this.update_at = new Date()
        this.updater_id = ""
        this.order_id = ""
        this.invoice = ""
        this.user_id = ""
    }
}

export class deliveriesItemModel {
    id: string
    name: string
    quantity: number
    price: number
    total: number
    code: string
    notes: string
    delivery_id: string
    variant_id: string
    constructor() {
        this.id = ""
        this.name = ""
        this.quantity = 0
        this.price = 0
        this.total = 0
        this.code = ""
        this.notes = ""
        this.delivery_id = ""
        this.variant_id = ""
    }
}



export enum invoiceStatus {
    Order = 1,
	Delivery = 2,
	Sales = 3,
	Receipt = 4
}


