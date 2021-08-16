import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvirontmentService } from './environtment.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {

  private env = this.envService.getGeneralEnvironment();
  private prefix = 'purchase';

  private GetInvoicePath = this.prefix + '/GetAll';
  private GetInvoiceUrl = this.env + this.GetInvoicePath;

  private DeletePurchasePath = this.prefix + '/Delete';
  private DeletePurchaseUrl = this.env + this.DeletePurchasePath;

  constructor(private http: HttpClient, private envService: EnvirontmentService) { }

  public GetAll(param) {
    return this.http.post<any>(this.GetInvoiceUrl, param)
  }

  public DeletePurchase(ids) {
    return this.http.post<any>(this.DeletePurchaseUrl, ids)
  }
}
