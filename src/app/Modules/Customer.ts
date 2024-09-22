import { Agence } from "./Agence";
import { Nationality } from "./Nationality";

export class Customer {
    
customer_ID: number;                 
    customerType: string;        
    shortName: string;                  
    gender: string;                 
    dateBirthCreation: Date;            
    address: string;                    
    postCode: number;                   
    legalDocName: string;        
    legalId: string;                    
    nationality: Nationality;               
    agence: Agence;         
    tel: string;                           
    mail: string;                       

    
}