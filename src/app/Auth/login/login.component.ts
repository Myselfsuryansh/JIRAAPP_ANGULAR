import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Shared/auth.service';
function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  const email: string = control.value;
  if (email && !email.toLowerCase().endsWith('.com')) {
    return { 'invalidEmail': true };
  }
  return null;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  LoginForm : FormGroup;
  public submitted:boolean=false
  constructor(private fb:FormBuilder, private service:AuthService, private toastr:ToastrService, public router:Router){
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, emailValidator]],
      password: ['', [Validators.required, Validators.maxLength]]
    })

  }

  get f (){
    return this.LoginForm.controls;
  }

  ngOnInit(): void {
    
  }

  public onLogin(){
    console.log(this.LoginForm.value, this.LoginForm.valid)
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    let data = {
      ...this.LoginForm.value
    }
    this.service.LoginIn(data).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Login  Successfully');
        this.router.navigate(['board']);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userData', JSON.stringify(res.user));
        // this.service.login();
        // this.scheduleTokenRefresh();
        this.submitted = false;
        this.LoginForm.reset();

      }
      else if (!res){
        this.toastr.success('Invalid password');
      }
      else {
        this.toastr.error('Invalid password')
        // this.handleExpiredToken();
      }
    })
  }
}
