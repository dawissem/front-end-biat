import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../Modules/AuthenticationRequest';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl="http://localhost:8081/api/user"
  
  constructor( private httpclient: HttpClient) { }

  
  authenticate(request:AuthenticationRequest):Observable<any>
  {
    
    return(this.httpclient.post<any>(this.baseUrl+"/authenticate", request));
  }
}
