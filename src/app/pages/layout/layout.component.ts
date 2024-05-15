import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/Shared/data.service';
import { ProfileComponent } from '../profile/profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  public datas:any[]=[]
  public data:any
  ticketObj:any={
  "ticketId": "",
  "summary": "",
  "status": "",
  "description": "",
  "parentId": "",
  "storyPoint": "",
  "ticketGuid": "",
  "assignedTo": "",
  "createdBy": "",
  "projectId": "5",
  "createdAt": "2024-05-10T13:35:37.582Z",
  }

  issueTypes :string[]=['Ticket','Defect','R&D Work'];
  status :string[]=['To Do', 'In Progress','Done']
  constructor(private service:DataService, private fb:FormBuilder, private router:Router, private dialogService: DialogService,){
    
    
  }

  setProject(obj:any){
    this.service.onProjectChange.next(obj)
  }
  ngOnInit(): void {
    this.getAllProjects();
    this.getAllUsers()
    const loginData = localStorage.getItem('userData');
    if (loginData !== null) {
      const userData = JSON.parse(loginData);
      this.ticketObj.createdBy = userData.userName;
      console.log(userData.userName)
    }
    


  }

  public  getAllProjects(){
    this.service.getAllProjects().subscribe((res:any)=>{
      if(res && res.Details){
        this.datas = res.Details;
        this.service.onProjectChange.next(this.datas[0])
      }
    })
  }

  public  getAllUsers(){
    this.service.getAllUser().subscribe((res:any)=>{
      if(res && res.Details){
        this.data = res.Details;
      }
    })
  }

  createTicket(){
    this.service.registerTickets(this.ticketObj).subscribe((res:any)=>{
      if(res && res.Details){
        console.log(res.Details)
        this.getAllUsers();
        this.service.onTicketCreate.next(true)
      }
      else{
        console.log('error')
      }
    })

  }

 
  public openProfileModal(){
    const ref = this.dialogService.open(ProfileComponent
      , {
      header: 'Your Profile',
      width: '70%',
    });

    ref.onClose.subscribe((passwordChanged: boolean) => {
      ref.close();
    });
  }
  public openChangePasswordModal(){
    const ref = this.dialogService.open(ChangePasswordComponent, {
      header: 'Change Password',
      width: '70%',
    });

    ref.onClose.subscribe((passwordChanged: boolean) => {
      if (passwordChanged) {
        console.log('Password changed successfully');
        ref.close();
      } else {
        console.log('Password change failed');
      }
    });
  }

  public onSignOut(){
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn')
  }


}
