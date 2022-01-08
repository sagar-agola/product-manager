import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: "forms",
        loadChildren: () => import("src/app/modules/event/form-fill/form-fill.module").then(m => m.FormFillModule),
    },
    {
        path: "registers",
        loadChildren: () => import("src/app/modules/event/event-register/event-register.module").then(m => m.EventRegisterModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventRoutingModule { }