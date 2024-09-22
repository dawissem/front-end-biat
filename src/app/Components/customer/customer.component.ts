import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { Account } from 'src/app/Modules/Account';
import { Agence } from 'src/app/Modules/Agence';
import { Currency } from 'src/app/Modules/Currency';
import { Customer } from 'src/app/Modules/Customer';
import { AccountService } from 'src/app/Services/account.service';
import { CountryService } from 'src/app/Services/country.service';
import { CurrencyService } from 'src/app/Services/currency.service';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  Dialog: boolean = false;
  dialogAccount=false;
  submitted: boolean = false
  customers:Customer[]=[];
  account=new Account()
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
 
  nationalityOptions: any[] = [
    
  ];
  currencyOptions: Currency[] = [
    
  ];

  categoryOptions = [
    { label: 'Cheque', value: 'CHEQUE' },
    { label: 'Epargne', value: 'EPARGNE' },
    { label: 'Courant', value: 'COURANT' }
  ];
  selectedCustomerType: any = null;
  selectedgender: any = null;
  selectedNationality: any = null;



  constructor( private messageService: MessageService, private confirmationService: ConfirmationService,
    private customerService:CustomerService,private countryService:CountryService,private currencyService:CurrencyService
    ,private accountService:AccountService
  ) {}

  ngOnInit() {
     
    this.getCostomers()
    this.getCountries()
    this. getCurrencies()

    this.setCustomerFromLocalStorage()
    this.setAccountrFromLocalStorage()

      
  }
  getCostomers()
  {
    this.customerService.getAll().subscribe(
        data=>{console.log(data);
            this.customers=data;
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
    const agencyId = localStorage.getItem('AgenceId');
    const agencyName = localStorage.getItem('AgenceName');

    
    if (agencyId&&agencyName) {
        console.log(agencyId);
        console.log(agencyName);

        this.customer.agence=new Agence() 
      this.customer.agence.id = +agencyId;
      this.customer.agence.name = agencyName;

      
    }
  }
  setAccountrFromLocalStorage() {
    const agencyId = localStorage.getItem('AgenceId');
    const agencyName = localStorage.getItem('AgenceName');

    
    if (agencyId&&agencyName) {
        console.log(agencyId);
        console.log(agencyName);

        this.account.accountOfficer=new Agence() 
      this.account.accountOfficer.id = +agencyId;
      this.account.accountOfficer.name = agencyName;

      
    }
  }
  openNew() {
     
      this.submitted = false;
      this.Dialog = true;
  }
  openAccountDialog(customer:Customer)
  {
    
    this.submitted = false;
    this.dialogAccount = true;
    this.account=new Account();
    this.setAccountrFromLocalStorage();
    this.account.customer=customer;

  }

  

  editCustomer(customer: any) {
      this.customer = { ...customer };
      this.updating=true;

      this.Dialog = true;
      
  }

  deleteCustomer(customer: any) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + customer.shortName + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon:"none",
          rejectIcon:"none",
          rejectButtonStyleClass:"p-button-text",
          acceptButtonStyleClass:"p-button-text",


          accept: () => {
              
            this.customerService.delete(customer.customer_ID).subscribe(
                data=>{
                    console.log(data);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'customer Deleted', life: 3000 });
                    this.getCostomers()
                    
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
      this.updating=false;
      
      this.setCustomerFromLocalStorage()

  }

  saveCustomer() {
      this.submitted = true;
        console.log(this.submitted);
        console.log(this.customer);
        console.log(this.updating);
        
        
        if (
            this.customer.shortName &&
            this.customer.customerType &&
            (this.customer.gender|| this.customer.customerType==="PM") &&
            this.customer.dateBirthCreation &&
            this.customer.address &&
            this.customer.postCode &&
            this.customer.legalDocName &&
            this.customer.legalId &&
            this.customer.nationality &&
            this.customer.tel &&
            this.customer.mail
          ){
          
          this.Dialog = false;
          if(this.updating)
            this.updateCustomer()
        else
          this.addCustomer()
         
      }
  }
  saveAccount() {
    this.submitted = true;
    if (
        this.account.accountTitle &&
        this.account.currency &&
        this.account.category &&
        this.account.workingBalance !== null &&  
        this.account.openingDate &&
        this.account.closureDate
    ) 
    {
        this.dialogAccount = false;
        this.addAccount()
    }
    console.log(this.account);
    
  }
  addCustomer()
  {
    this.customerService.add(this.customer).subscribe(
        data=>{console.log(data);
            this.messageService.add({ severity: 'success', summary: 'succeffully', detail: "Customer Added Succeffully"  });
        this.getCostomers()},
        error=>{
            console.log(error); 
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
        })
  }
  addAccount()
  {
    this.accountService.add(this.account).subscribe(
        data=>{console.log(data);
            this.messageService.add({ severity: 'success', summary: 'succeffully', detail: "account Added Succeffully"  });
        },
        error=>{
            console.log(error); 
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
        })
  }
  updateCustomer()
  {
    this.customerService.update(this.customer,this.customer.customer_ID).subscribe(
        data=>{console.log(data);
            this.messageService.add({ severity: 'success', summary: 'succeffully', detail: "Customer Updated Succeffully"  });
        this.getCostomers()},
        error=>{
            console.log(error); 
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
        })
  }

  

  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
            return 'info'; // Default value for unmatched statuses
    }
}
getTypeSeverity(status: string) {
    switch (status) {
        case 'PM':
            return 'success';
        case 'PP':
            return 'info';
        
        default:
            return 'info'; // Default value for unmatched statuses
    }
}
getGenderSeverity(status: string) {
    switch (status) {
        case 'MALE':
            return 'info';
        case 'FEMALE':
            return 'danger';
        
        default:
            return 'danger'; // Default value for unmatched statuses
    }
}
getlegalDocSeverity(status: string) {
    switch (status) {
        case 'CIN':
            return 'success';
        case 'PASSPORT':
            return 'warning';
        case 'CARTE_SEJOUR':
             return 'danger';
         case 'REGISTRE_COMMERCE':
            return 'help';
        case 'ID_FISCAL':
            return 'Primary';
        
        default:
            return 'danger'; // Default value for unmatched statuses
    }
}
log(value)
{
    console.log(value);
    
}
}
