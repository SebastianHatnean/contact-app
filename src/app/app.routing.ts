import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ContactComponent } from './contact';
import { AuthGuard } from './_guards';
import { AddContactComponent } from './add-contact/add-contact.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'contacts', component: ContactComponent, canActivate: [AuthGuard]},
    { path: 'add-contact', component: AddContactComponent, canActivate: [AuthGuard]},
    { path: 'update-contact/:id', component: AddContactComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);