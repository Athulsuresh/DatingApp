import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './member-list/member-list.component';
import { HomeComponent } from './home/home.component';


import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

export const Approutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent},
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListComponent }
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

//export const appRouting = RouterModule.forRoot(routes) ;
