import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getAllProjects(){
    return this.http.get('http://localhost:8080/api/v1/Jira/getJiraDetails')
  }

  GetTicketsByProjectId(id:any){
    return this.http.get('http://localhost:8080/api/v1/Jira/GetTicketsByProjectId?id='+id)
  }

  getAllProjectById(id:any){
    return this.http.get('http://localhost:8080/api/v1/Jira/getAllProjectById?id='+id)
  }

  saveProject(data:any){
    return this.http.post('http://localhost:8080/api/v1/Jira/registerJiraDetails',data)
  }

  registerUser(user:any){
    return this.http.post('http://localhost:8080/api/v1/Jira/registerUser',user)
  }

  getAllUser(){
    return this.http.get('http://localhost:8080/api/v1/Jira/getUser')
  }

  updateUser(_id: any, data: any){
    return this.http.put(`http://localhost:8080/api/v1/Jira/updateUser?id=${_id}`,data)
  }
  
  getDataForSpecificID(id: any) {
    return this.http.get(`http://localhost:8080/api/v1/Jira/getAllUserById?id=${id}`);
  }

  deleteUser(_id:any){
    return this.http.delete(`http://localhost:8080/api/v1/Jira/deleteUser?id=${_id}`)
  }

  registerTickets(data:any){
    return this.http.post('http://localhost:8080/api/v1/Jira/registerTicketDetails',data)
  }

  getAllTickets(){
    return this.http.get('http://localhost:8080/api/v1/Jira/getTicketDetails')
  }
  changePassword(id: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/student/changePassword', { id, oldPassword, newPassword });
  }

  getProjectById(id:any){
    return this.http.get('http://localhost:8080/api/v1/Jira/getAllProjectById?id='+id)
  }
  updateProjectDetails(id:any, data:any){
    return this.http.put('http://localhost:8080/api/v1/Jira/updateJiraDetails?id='+id,data)
  }

  deleteProjectDetails(id:any){
    return this.http.delete('http://localhost:8080/api/v1/Jira/deleteJira?id='+id)
  }

    public onProjectChange = new Subject();
    public onTicketCreate = new Subject()
}
