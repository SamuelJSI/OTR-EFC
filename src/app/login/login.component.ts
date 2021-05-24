import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MyEmail } from '../Interfaces/my-email';

/** Data structure for holding telephone number. */
export class MyTel {
  constructor(
    public area: string,
    public exchange: string,
    public subscriber: string
  ) {}
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userForm!: FormGroup;
  hide = true;
  user:any;
  constructor(private router: Router, private route: ActivatedRoute,public fb: FormBuilder) {
    this.user = [{Username:'',password:'',email:''}]
  }

  ngOnInit(): void {
    
    this.userForm = this.fb.group({
      Username: ['',[Validators.required, Validators.maxLength(20)]],
      email: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*[@]{1}[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      password: ['',[Validators.required,Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'))]]
    });
  }

  get f() { return this.userForm.controls; }

  getcustomFormValue(valueemitted):void {
    console.log("valueemitted :: ",valueemitted);
    this.user.email = valueemitted.emailaddress;
  }

  public login = (userFormValue: any):void => {
    console.log("login Info == ",this.userForm.value);
    if (this.userForm.valid) {
      let email = userFormValue.email;
      localStorage.setItem("loggedInUsername",userFormValue.Username);
      localStorage.setItem("loggedInUserEmail",userFormValue.email);
      if(localStorage.getItem("loggedInUserEmail")){
       // this.router.navigate(["/table"]);
      }
    }
  }


 


}
