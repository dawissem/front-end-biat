import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseUrl="http://localhost:8081/api/country"
  
  constructor( private httpclient: HttpClient) { }
  getAll() :Observable<any>
    {
     
      return(this.httpclient.get(this.baseUrl+"/all"));
    }
}
