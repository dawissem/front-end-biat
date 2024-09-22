import { Agence } from "./Agence";
import { Currency } from "./Currency";
import { Customer } from "./Customer";

export class Account {
    id: number; 
    customer: Customer; 
    accountOfficer: Agence; 
    accountTitle: string;
    currency: Currency;
    category: string; 
    workingBalance: number;
    openingDate: Date;
    closureDate: Date; 
}