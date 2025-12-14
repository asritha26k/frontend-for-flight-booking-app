import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import { LoggedinPage } from './components/loggedin-page/loggedin-page';
import { App } from './app';
import { Signup } from './components/signup/signup';
import { Signin } from './components/signin/signin';
export const routes: Routes = [
    {path:'',component:Home},
    {path:'signup',component:Signup},
    {path:'signin',component:Signin},
    {path:'signedin',component:LoggedinPage}


];
