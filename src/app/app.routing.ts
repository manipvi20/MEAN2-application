import { RouterModule, Routes }     from "@angular/router";

import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent }    from "./not-found.component";

import { PreventUnsavedChanges } from './auth.gaurd';

const routing: Routes = [
    { path: '', component: SignupComponent},
    { path: 'user/:username', component: HomeComponent},
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];

export const appRouterModule = RouterModule.forRoot(routing);
