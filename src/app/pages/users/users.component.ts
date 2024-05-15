import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/Shared/data.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public datas :any=[]
  public userId:any
  public userForm:FormGroup;
  public userUpdateForm:FormGroup;
  public submitted:boolean=false
  
  constructor(private service:DataService, private fb:FormBuilder,private toastr:ToastrService,){

  }

  get f(){
    return this.userForm.controls;
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.userForm = this.fb.group({
      userName:['',Validators.required],
      email: ['',Validators.required],
      password:['',Validators.required]
    })
    this.userUpdateForm = this.fb.group({
      userName:['',Validators.required],
      email: ['',Validators.required],
      password:['',Validators.required]
    })



  }

 public  getAllUsers(){
    this.service.getAllUser().subscribe((res:any)=>{
      if(res && res.Details){
        this.datas = res.Details;
      }
    })
  }
  

  public onUserSave(){
    console.log(this.userForm.value, this.userForm.valid)
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    let data = {
      ...this.userForm.value
    }
    this.service.registerUser(data).subscribe((res: any) => {
      if (res) {
        this.toastr.success('User Added Successfully');
        this.submitted = false;
        this.userForm.reset();
        this.getAllUsers()

      }
      else if (!res){
        this.toastr.success('Error');
      }
      else {
        this.toastr.error('Error')
   
      }
    })
  }

  public onUserUpdate(){
    
    this.submitted = true;
    if (this.userUpdateForm.invalid) {
      return;
    }
    let data = {
      ...this.userUpdateForm.value
    }
    this.service.updateUser(this.userId,data).subscribe((res: any) => {
      if (res) {
        this.toastr.success('User Updated Successfully');
        this.submitted = false;
        this.userUpdateForm.reset();
        this.getAllUsers()

      }
      else if (!res){
        this.toastr.success('Error');
      }
      else {
        this.toastr.error('Error')
   
      }
    })
  }

  public onEdit(userData:any){
    
    this.userId = userData
    this.getDataForEdit(userData);
    

  }

  getDataForEdit(_id: number): void {
    
    this.service.getDataForSpecificID(_id).subscribe((response:any)=>{
      if(response.success && response.userId){
        const studentData = response.userId;
        this.userUpdateForm.patchValue({
          userName:studentData.userName,
          email:studentData.email,
          password:studentData.password
        })
      }
    })
  }
  
  public onDelete(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUser(id).subscribe((res: any) => {
          if (res) {
            Swal.fire('Deleted!', 'The data has been deleted.', 'success');
            this.getAllUsers();
          } else {
            Swal.fire('Error', 'Unable to delete the data.', 'error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Not Cancelled', 'The data is safe :)', 'info');
      }
    });
  }

}
