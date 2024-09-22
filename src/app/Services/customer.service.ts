import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Modules/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl="http://localhost:8081/api/customer"
  
  constructor( private httpclient: HttpClient) { }
  getAll() :Observable<any>
    {
     
      return(this.httpclient.get(this.baseUrl+"/all"));
    }

    add(customer:Customer):Observable<any>
    {
     
      return(this.httpclient.post(this.baseUrl+"/add",customer, {
        responseType: 'text' as 'json'}));
    }
    update(customer:Customer,id:number):Observable<any>
    {
     
      return(this.httpclient.put(this.baseUrl+"/"+id,customer, {
        responseType: 'text' as 'json'}));
    }

    delete(id:number):Observable<any>
    {
     
      return(this.httpclient.delete(this.baseUrl+"/delete/"+id, {
        responseType: 'text' as 'json'}));
    }
}
