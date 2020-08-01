import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormConstructorComponent } from './form-constructor.component';
import { NewFormComponent } from './components/new-form/new-form.component';


const routes: Routes = [
    {
        path: 'form-constructor', component: FormConstructorComponent, children: [
            { path: 'nuevo', component: NewFormComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormConstructorRoutingModule { }
