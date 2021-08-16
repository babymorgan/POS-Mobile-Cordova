import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvirontmentService } from './environtment.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private env = this.envService.getGeneralEnvironment();

  private prefix = 'invoice';
  private GetInvoicePath = this.prefix + '/GetAll';
  private GetInvoiceUrl = this.env + this.GetInvoicePath;

  private DeleteInvoicePath = this.prefix + '/Delete';
  private DeleteInvoiceUrl = this.env + this.DeleteInvoicePath;

  constructor(private http: HttpClient, private envService: EnvirontmentService) { }

  public GetAllInvoice(param) {
    return this.http.post<any>(this.GetInvoiceUrl, param)
  }

  public DeleteInvoice(ids) {
    return this.http.post<any>(this.DeleteInvoiceUrl, ids)
  }
}
