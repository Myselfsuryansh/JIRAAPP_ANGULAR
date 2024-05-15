import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/Shared/data.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  public datas :any=[]
  public projectForm:FormGroup;
  public projectId:any
  public projectUpdateForm:FormGroup
  public submitted:boolean=false
  constructor(private service:DataService, private fb:FormBuilder,private toastr:ToastrService,){

  }

  get f(){
    return this.projectForm.controls;
  }

  ngOnInit(): void {
    this.getAllProjects();
    this.projectForm = this.fb.group({
      projectId:['',Validators.required],
      projectName: ['',Validators.required],
      shortName:['',Validators.required]
    })
    this.projectUpdateForm = this.fb.group({
      projectId:['',Validators.required],
      projectName: ['',Validators.required],
      shortName:['',Validators.required]
    })


  }

 public  getAllProjects(){
    this.service.getAllProjects().subscribe((res:any)=>{
      if(res && res.Details){
        this.datas = res.Details;
      }
    })
  }
  

  public onProjectSave(){
    console.log(this.projectForm.value, this.projectForm.valid)
    this.submitted = true;
    if (this.projectForm.invalid) {
      return;
    }
    let data = {
      ...this.projectForm.value
    }
    this.service.saveProject(data).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Project Added Successfully');
        this.submitted = false;
        this.projectForm.reset();
        this.getAllProjects()

      }
      else if (!res){
        this.toastr.success('Error');
      }
      else {
        this.toastr.error('Error')
   
      }
    })
  }
  public getDataForEdit(_id: number): void {
    this.service.getProjectById(_id).subscribe((response:any)=>{
      console.log(response.projectId,'studentData')
      if(response.success && response.projectId){
        const ProjectData = response.projectId;
        console.log(response.projectId,'studentData')
        this.projectUpdateForm.patchValue({
          projectId:ProjectData.projectId,
          projectName:ProjectData.projectName,
          shortName:ProjectData.shortName
        })
      }
    })
  }
  public onProjectUpdate(){
    console.log(this.projectUpdateForm.value, this.projectUpdateForm.valid)
    this.submitted = true;
    if (this.projectUpdateForm.invalid) {
      return;
    }
    let data = {
      ...this.projectUpdateForm.value
    }
    this.service.updateProjectDetails(this.projectId,data).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Project Added Successfully');
        this.submitted = false;
        this.projectUpdateForm.reset();
        this.getAllProjects()

      }
      else if (!res){
        this.toastr.success('Error');
      }
      else {
        this.toastr.error('Error')
   
      }
    })
  }

  public onEdit(id:any){
    this.projectId=id
    console.log(id,'ProjectId')
    this.getDataForEdit(id);
  }

  onDelete(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteProjectDetails(id).subscribe((res: any) => {
          if (res) {
            Swal.fire('Deleted!', 'The data has been deleted.', 'success');
            this.getAllProjects();
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
