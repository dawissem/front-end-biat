import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  baseUrl="http://localhost:8081/api/currency"
  
  constructor( private httpclient: HttpClient) { }
  getAll() :Observable<any>
    {
     
      return(this.httpclient.get(this.baseUrl+"/all"));
    }
}
