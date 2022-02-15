import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { LoginComponent } from './login/login.component';
import { RouteGuard } from './route.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { path: '', redirectTo: "/login", pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'sign-up', component: SignupComponent },
    {
        path: 'dashboard', component: DefaultLayoutComponent, canActivate: [RouteGuard],
        children: [{ path: '', component: DashboardComponent }]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
