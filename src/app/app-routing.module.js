import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
const appRoutes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent }
];
export class AppRoutingModule {
}
AppRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
                exports: [RouterModule]
            },] },
];
