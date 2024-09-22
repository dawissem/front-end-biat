import { Component } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Account } from 'src/app/Modules/Account';
import { Agence } from 'src/app/Modules/Agence';
import { Currency } from 'src/app/Modules/Currency';
import { Customer } from 'src/app/Modules/Customer';
import { AccountService } from 'src/app/Services/account.service';
import { CountryService } from 'src/app/Services/country.service';
import { CurrencyService } from 'src/app/Services/currency.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {

  Dialog: boolean = false;
  agencyId:number;
  submitted: boolean = false
  accounts:Account[]=[];
  items: MenuItem[]=[
    {
        label: 'Customers',
        icon: 'pi pi-users',
        routerLink: ['/customers']
    },
    {
        label: 'Accounts',
        icon: 'pi pi-id-card',
        routerLink: ['/accounts']
    },
    {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        routerLink: ['/login']
    }
    
]
customer=new Customer();
account=new Account();
updating=false;
customerTypeOptions = [
    { label: 'Physical', value: 'PP' },
    { label: 'Moral', value: 'PM' }
  ];

  genderOptions = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' }
  ];

  legalDocOptions = [
    { label: 'Passport', value: 'PASSPORT' },
    { label: 'Cin', value: 'CIN' },
    { label: ' Carte Sejour', value: ' CARTE_SEJOUR' },
    { label: 'Id Fiscal', value: 'ID_FISCAL' },
    { label: 'Registre Commerce', value: 'REGISTRE_COMMERCE' },
    {}
    
  ];
  filterDate: Date | null;
  selectedCategory=null;
  selectedCurrency=null;
  nationalityOptions: any[] = [
    
  ];
  currencyOptions: Currency[] =[];

  categoryOptions = [
    { label: 'Cheque', value: 'CHEQUE' },
    { label: 'Epargne', value: 'EPARGNE' },
    { label: 'Courant', value: 'COURANT' }
  ];
  constructor( private messageService: MessageService, private confirmationService: ConfirmationService,
    private accountService:AccountService,private countryService:CountryService,private currencyService:CurrencyService
  ) {}

  ngOnInit() {
     
    this.getAccounts()
    this.getCountries()
    this.getCurrencies()

    this.setCustomerFromLocalStorage()
      
  }
  getAccounts()
  {
    this.accountService.getAll().subscribe(
        data=>{console.log(data);
            this.accounts=data;
        },
        error=>console.error(error)
        
    )
  }
  getCountries()
  {
    this.countryService.getAll().subscribe(
        data=>{console.log(data);
            this.nationalityOptions=data;
        },
        error=>console.error(error)
        
    )
  }
  getCurrencies()
  {
    this.currencyService.getAll().subscribe(
        data=>{console.log(data);
            this.currencyOptions=data;
        },
        error=>console.error(error)
        
    )
  }
  setCustomerFromLocalStorage() {
    this.agencyId = +localStorage.getItem('AgenceId');
    const agencyName = localStorage.getItem('AgenceName');

    
    if (this.agencyId&&agencyName) {
        console.log(this.agencyId);
        console.log(agencyName);

        this.customer.agence=new Agence() 
      this.customer.agence.id = this.agencyId;
      this.customer.agence.name = agencyName;

      
    }
  }
  openNew() {
     
      this.submitted = false;
      this.Dialog = true;
  }

  

  editAccount(account: Account) {
      this.account = { ...account };
     

      this.Dialog = true;
      
  }

  deleteAccount(account: Account) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + account.accountTitle + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon:"none",
          rejectIcon:"none",
          rejectButtonStyleClass:"p-button-text",
          acceptButtonStyleClass:"p-button-text",


          accept: () => {
              
            this.accountService.delete(account.id).subscribe(
                data=>{
                    console.log(data);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'account Deleted', life: 3000 });
                    this.getAccounts()
                    
                },
                error=>{
                    console.log(error); 
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
                }
                
            )
          }
      });
  }

  hideDialog() {
      this.Dialog = false;
      this.submitted = false;
      this.customer=new Customer()
     
      this.setCustomerFromLocalStorage()

  }

  
 
  updateAccount()
  {
    this.accountService.update(this.account,this.account.id).subscribe(
        data=>{console.log(data);
            this.messageService.add({ severity: 'success', summary: 'succeffully', detail: "Account Updated Succeffully"  });
        this.getAccounts();this.hideDialog()},
        
        error=>{
            console.log(error); 
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
        })
  }

  getCategorySeverity(status: string) {
    switch (status) {
        case 'CHEQUE':
            return 'success';
        case 'EPARGNE':
            return 'info';
        
        default:
            return 'warning'; // Default value for unmatched statuses
    }
}
log(value)
{
    console.log(value);
    
}


  
}
