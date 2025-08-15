import { Routes } from '@angular/router';
import { Todolist } from './todolist/todolist';
import { Details } from './details/details';

export const routes: Routes = [
    {path: '', redirectTo: '/todolist', pathMatch: 'full'},
    {path: 'todolist', component: Todolist},
    {
        path: 'details/:id',
        loadComponent: () =>
        import('./details/details').then(m => m.Details)
 }

];
