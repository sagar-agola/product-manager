import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: "forms",
        children: [
            {
                path: "",
                loadChildren: () => import("src/app/modules/event/form-fill/form-fill.module").then(m => m.FormFillModule),
            },
            {
                path: "view",
                loadChildren: () => import("src/app/modules/event/form-view/form-view.module").then(m => m.FormViewModule),
            }
        ]
    },
    {
        path: "registers",
        loadChildren: () => import("src/app/modules/event/event-register/event-register.module").then(m => m.EventRegisterModule),
    },
    {
        path: "dashboard",
        loadChildren: () => import("src/app/modules/event/event-dashboard/event-dashboard.module").then(m => m.EventDashboardModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventRoutingModule { }