import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvirontmentService } from './environtment.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private env = this.envService.getGeneralEnvironment()

  private prefix = 'contact/customer';

  private getAllCustomerUrl = this.env + this.prefix;


  constructor(private envService: EnvirontmentService, private http: HttpClient) { }

  public GetAllCustomer() {
    return this.http.get<any>(this.getAllCustomerUrl);
  }



}
