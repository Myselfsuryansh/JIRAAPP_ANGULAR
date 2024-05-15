import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UsersComponent } from './pages/users/users.component';
import { BoardComponent } from './pages/board/board.component';
import { RegisterComponent } from './Auth/register/register.component';
import { AuthGuard } from './Shared/auth.guard';

const routes: Routes = [
  {path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {path:'',
    component:LayoutComponent,
    children:[
      {
        path:'project',
        component:ProjectsComponent,
        
      },
      {
        path:'users',
        component:UsersComponent,
        
      },
      {
        path:'board',
        component:BoardComponent,
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
