export class FeedModel {
    id: string
    company_name: string
    business_type: string
    address: string
    subject: string
    message: string
    image: string
    phone: string
    created: Date
    reference_id : string
    constructor() {
        this.id = ""
        this.company_name = ""
        this.business_type = ""
        this.address = ""
        this.message = ""
        this.image = ""
        this.phone = ""
        this.created = new Date()
        this.reference_id = ""
    }
}