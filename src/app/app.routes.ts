import { Routes } from '@angular/router';
import { Todolist } from './todolist/todolist';
import { Details } from './details/details';

// Define application routes
// export const appRoutes: Routes = [
//     {path: '', redirectTo: '/todolist', pathMatch: 'full'},
//     {path: 'todolist', component: Todolist},
//     {path: 'details/:id', component: Details}
// ];

export const routes: Routes = [
    {path: '', redirectTo: '/todolist', pathMatch: 'full'},
    {path: 'todolist', component: Todolist},
    {path: 'details/:id', component: Details}
];
