import { Component, Inject, Injectable, Injector, OnInit } from '@angular/core';
interface Account {
  balance : number,
  accountId: string,
  getBalance?:()=>void; 
  getAccountId?:()=>void; 
  withdraw?:(number)=>void; 
  deposit?:(number)=>void; 
}

@Component({
  selector: 'app-account',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.css'],
})
export class AccountComponent implements OnInit, Account {
  balance: number;
  accountId: string;
  minimumBalance: number = 1000;

  constructor(@Inject(String) public account: Account) {
    this.balance = account.balance;
    this.accountId = account.accountId;
  }

  ngOnInit(): void {}
  getAccountId = (): void => {
    console.log('Account :: getAccountId :: ', this.accountId);
  };
  getBalance = (): void => {
    console.log('Account :: getBalance :: ', this.balance);
  };
  withdraw = (amount: number): any => {
    if (this.balance >= this.minimumBalance && this.balance >= amount) {
      this.balance = this.balance - amount;
      console.log(
        'Account :: withdrawed sucess!! remaining amount :: ',
        this.balance
      );
    }
  };
  deposit = (amount: number): any => {
    this.balance = this.balance + amount;
    console.log('Account :: deposit sucess!! current amount :: ', this.balance);
  };
}

class SavingAccount extends AccountComponent {
  interestRate: number;
  constructor(account, interestRate) {
    super(account);
    this.interestRate = interestRate;
  }
  getInterest = (): any => {
    console.log('SavingAccount:: getInterest :: ', this.interestRate);
  };
}

class CheckingAccount extends AccountComponent {
  numberOfChecksUsed: number;
  constructor(account, numberOfChecksUsed) {
    super(account);
    this.numberOfChecksUsed = numberOfChecksUsed;
  }

  resetCheckUsed = (): any => {
    console.log('resetCheckUsed');
  };

  withdrawUsingCheck = (): any => {
    console.log('withdrawUsingCheck');
  };
}

class MoneyMarketAccount extends AccountComponent{
  numberOfTransactions:number;
  constructor(account,numberOfTransactions) {
    super(account);
    this.numberOfTransactions = numberOfTransactions;
  }
  madeNumberOfTransactions= ():any=>{
    console.log("madeNumberOfTransactions :: ",this.numberOfTransactions); 
  }

  resetNumberOfTransactions= (numberOfTransactions:number):any=>{
    this.numberOfTransactions = numberOfTransactions;
    console.log("resetNumberOfTransactions :: ",this.numberOfTransactions); 
  }

}
//let accountObject: Account[]=[];
console.log("========= CheckingAccount ===========");
let checkingAccountObject = new CheckingAccount({"balance":5000,"accountId":"6788"},2);
checkingAccountObject.getAccountId();
checkingAccountObject.getBalance();
checkingAccountObject.withdraw(500);
checkingAccountObject.deposit(1000);
checkingAccountObject.resetCheckUsed();
console.log("========= SavingAccount ===========");
let savingAccountObject = new SavingAccount({"balance":2000,"accountId":"12345"},0.13);
savingAccountObject.getAccountId();
savingAccountObject.getBalance();
savingAccountObject.withdraw(500);
savingAccountObject.deposit(1000);
savingAccountObject.getInterest();
console.log("========= MoneyMarketAccount ===========");
let moneyMarketAccountObject = new MoneyMarketAccount({"balance":10000,"accountId":"12345"},10);
moneyMarketAccountObject.resetNumberOfTransactions(0);
moneyMarketAccountObject.getBalance();
moneyMarketAccountObject.getAccountId();
moneyMarketAccountObject.deposit(1000);



