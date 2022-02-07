import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MccLibComponent } from './mcc_lib.component';

const routes: Routes = [
    {
        path: '',
        component: MccLibComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MccLibRoutingModule {}
