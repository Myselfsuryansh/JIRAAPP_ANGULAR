import { Component } from '@angular/core';
import { DataService } from 'src/app/Shared/data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
    public ticketArray :any[]=[]
    status :string[]=['To Do', 'In Progress','Done']
    public selectedProjectData:any;
  constructor(private service:DataService){
    this.service.onProjectChange.subscribe((res:any)=>{
      
      this.GetTicketsByProjectId(res.projectId)
    })
    this.service.onTicketCreate.subscribe((res:any)=>{
      this.GetTicketsByProjectId(this.selectedProjectData.projectId)
    })

  }

  GetTicketsByProjectId(id:any){
    
    this.service.GetTicketsByProjectId(id).subscribe((res:any)=>{

      this.ticketArray=res.tickets;
      console.log(this.ticketArray);
      
    })
  }

  filterTicket(status:string){
    return this.ticketArray.filter(m=>m.status == status)
  }
}
