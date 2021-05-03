import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


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
    this.user = [{Username:'',password:''}]

  }

  ngOnInit(): void {
    
    this.userForm = this.fb.group({
      Username: ['',[Validators.required, Validators.maxLength(20)]],
      password: ['',[Validators.required,Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'))]]
        //Validators.pattern('/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/')])
    });
  }

  get f() { return this.userForm.controls; }


  public login = (userFormValue: any) => {
    if (this.userForm.valid) {
      localStorage.setItem("loggedInUsername",userFormValue.Username);
      this.router.navigate(["/table"]);
    }
  }


 


}
