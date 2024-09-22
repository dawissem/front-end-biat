import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../Modules/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl="http://localhost:8081/api/account"
  
  constructor( private httpclient: HttpClient) { }
  getAll() :Observable<any>
    {
     
      return(this.httpclient.get(this.baseUrl+"/all"));
    }
    add(account:Account):Observable<any>
    {
     
      return(this.httpclient.post(this.baseUrl+"/add",account, {
        responseType: 'text' as 'json'}));
    }
   
    update(account:Account,id:number):Observable<any>
    {
     
      return(this.httpclient.put(this.baseUrl+"/"+id,account, {
        responseType: 'text' as 'json'}));
    }

    delete(id:number):Observable<any>
    {
     
      return(this.httpclient.delete(this.baseUrl+"/delete/"+id, {
        responseType: 'text' as 'json'}));
    }
}
