export class FilterModel {
    id : string
    pageNumber: number
    pageSize: number
    textSearch: string
    notes: string
    number: string
    from : Date
    to : Date
    constructor(pgNumber: number, pgSize: number) {
        this.pageNumber = pgNumber
        this.pageSize = pgSize
        this.textSearch = ""
    }
}