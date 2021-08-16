import { Injectable } from '@angular/core';
import { EnvirontmentService } from './environtment.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private env = this.envService.getGeneralEnvironment()
  private prefix = 'cashier'

  private GetChartItemByVariantPath = this.prefix + '/getChartItemVariantByID';
  private GetChartItemByVariantUrl = this.env + this.GetChartItemByVariantPath;

  private GetChartUnsellableItemByIDPath = this.prefix + '/getChartUnsellableItemByID';
  private GetChartUnsellableItemByIDUrl = this.env + this.GetChartUnsellableItemByIDPath;


  private GetInvoiceByIDPath = this.prefix + '/GetInvoiceByID';
  private GetInvoiceByIDUrl = this.env + this.GetInvoiceByIDPath;

  private GetCartLoaderPath = this.prefix + '/GetCartLoader';
  private GetCartLoaderUrl = this.env + this.GetCartLoaderPath;

  private SubmitCartPath = 'receipt/sales/submit';
  private SubmitCartUrl = this.env + this.SubmitCartPath;

  private getSalesPath = this.prefix + '/sales';
  private getSalesUrl = this.env + this.getSalesPath;

  private SubmitCartOrderPath = this.prefix + '/sales/submit';
  private SubmitCartOrderUrl = this.env + this.SubmitCartOrderPath;

  constructor(private envService: EnvirontmentService, private http: HttpClient) { }

  public getSales(filter){
    return this.http.post<any>(this.getSalesUrl, filter)
  }

  public GetChartItemByVariantID(param) {
    let params = new HttpParams();
    params = params.append('id', param);

    return this.http.get<any>(this.GetChartItemByVariantUrl, { params })
  }

  public GetUnsellableItemByID(param) {
    let params = new HttpParams();
    params = params.append('id', param);

    return this.http.get<any>(this.GetChartUnsellableItemByIDUrl, { params })

  }

  public GetInvoice(param) {
    let params = new HttpParams();
    params = params.append('id', param);

    return this.http.get<any>(this.GetInvoiceByIDUrl, { params })
  }

  public GetCartLoader() {
    return this.http.get<any>(this.GetCartLoaderUrl)
  }

  public SubmitCart(cart) {
    return this.http.post<any>(this.SubmitCartUrl, cart)
  }

  public SubmitCartOrder(cart) {
    return this.http.post<any>(this.SubmitCartOrderUrl, cart)
  }


}
