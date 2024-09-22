import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationRequest } from 'src/app/Modules/AuthenticationRequest';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  request=new AuthenticationRequest();
  submitted=false;

  constructor(private loginService:LoginService,private messageService: MessageService, private router: Router){}

  authenticate()
  {
    this.loginService.authenticate(this.request).subscribe(
      data=>{console.log( data.agence.id);
        localStorage.setItem('AgenceId', data.agence.id);
        localStorage.setItem('AgenceName', data.agence.name);

        this.router.navigate(['/customers']);},
      error=>{  console.error(error);
      
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });

      }
      
      
    )
  }
  submit()
  {
    
    
    this.submitted=true;
    console.log(this.submitted);
    if(this.request.matricule&& this.request.password)
    {
      console.log(this.request);
      this.authenticate();

    }
    
  }
}
