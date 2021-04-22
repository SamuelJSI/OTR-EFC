import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private router: Router, private route: ActivatedRoute) {
    this.user = [{Username:'',password:''}]

  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      Username: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      //dateOfBirth: new FormControl(new Date()),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public login = (userFormValue: any) => {
    if (this.userForm.valid) {
      localStorage.setItem("loggedInUsername",userFormValue.Username);
      this.router.navigate(["/dynamictable"]);
      //  this.executeOwnerCreation(userFormValue);
    }
  }


 


}
