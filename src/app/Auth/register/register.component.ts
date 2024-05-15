import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  public registerForm:FormGroup;
  public submitted:boolean=false;

  constructor(private fb:FormBuilder, private router:Router, private service:AuthService, private toastr:ToastrService){

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName:['', Validators.required],
      email:['',Validators.required],
      password:['', Validators.required]
    })
    
  }

  get f(){
    return this.registerForm.controls;
  }

  public onRegister(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return 
    }

    let data ={
      ...this.registerForm.value
    }

    this.service.registerUser(data).subscribe((res:any)=>{
      if(res && res.user){
        this.router.navigate(['/login']);
        this.toastr.success('Registered Successfully')

      }
    })

  }
}
