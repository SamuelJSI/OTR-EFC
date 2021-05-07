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
 @Input() triggerEmail:any;
  constructor(private router: Router, private route: ActivatedRoute,public fb: FormBuilder) {
    this.user = [{Username:'',password:''}]
  }

  ngOnInit(): void {
    
    this.userForm = this.fb.group({
      Username: ['',[Validators.required, Validators.maxLength(20)]],
      //tel: new FormControl(new MyTel('', '', '')),
      email: [new FormControl(new MyEmail('','',''),[])],

      password: ['',[Validators.required,Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'))]]
        //Validators.pattern('/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/')])
    });
  }

  get f() { return this.userForm.controls; }

  getcustomFormValue(valueemitted){
    console.log("valueemitted",valueemitted);
    this.user.email = valueemitted.email.username+valueemitted.email.atsymbol+valueemitted.email.domain;
    console.log(" this.user.email  == ", this.user.email );
  }

  public login = (userFormValue: any) => {
    console.log("login Info == ",userFormValue);
    if (this.userForm.valid) {
      let email = userFormValue.email.username+userFormValue.email.atsymbol+userFormValue.email.domain;
      console.log("login Info email == ",email);

      localStorage.setItem("loggedInUsername",userFormValue.Username);
      localStorage.setItem("loggedInUserEmail",email);

    this.router.navigate(["/table"]);
    }
  }


 


}
