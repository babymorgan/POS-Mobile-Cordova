import { Injectable } from '@angular/core';
import { EnvirontmentService } from './environtment.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private env = this.envService.getGeneralEnvironment()
  private prefix = "setting/payment"

  private GetAllPaymentUrl = this.env + this.prefix;

  private GetChartItemByVariantPath = this.prefix + '/getChartItemVariantByID';
  private GetChartItemByVariantUrl = this.env + this.GetChartItemByVariantPath;

  private GetChartUnsellableItemByIDPath = this.prefix + '/GetChartUnsellableItemByID';
  private GetChartUnsellableItemByIDUrl = this.env + this.GetChartUnsellableItemByIDPath;

  
  private GetInvoiceByIDPath = this.prefix + '/GetInvoiceByID';
  private GetInvoiceByIDUrl = this.env + this.GetInvoiceByIDPath;

  private GetCartLoaderPath = this.prefix + '/GetCartLoader';
  private GetCartLoaderUrl = this.env + this.GetCartLoaderPath;

  private SubmitCartPath = this.prefix + '/Submit';
  private SubmitCartUrl = this.env + this.SubmitCartPath;

  constructor(private envService: EnvirontmentService, private http: HttpClient) { }
  public  GetChartItemByVariantID(param)
  {
    let params = new HttpParams();
    params = params.append('id', param);
    
    return this.http.get<any>(this.GetChartItemByVariantUrl,{params})
  }

  public GetUnsellableItemByID(param){
    let params = new HttpParams();
    params = params.append('id', param);
    
    return this.http.get<any>(this.GetChartUnsellableItemByIDUrl,{params})
    
  }

  public GetAllPayment() {

    return this.http.get<any>(this.GetAllPaymentUrl)
  }

  public GetInvoice(param)
  {
    let params = new HttpParams();
    params = params.append('id', param);
    
    return this.http.get<any>(this.GetInvoiceByIDUrl,{params})
  }

  public GetCartLoader()
  {    
    return this.http.get<any>(this.GetCartLoaderUrl)
  }

  public SubmitCart(cart)
  {
    return this.http.post<any>(this.SubmitCartUrl,cart)
  }

}
