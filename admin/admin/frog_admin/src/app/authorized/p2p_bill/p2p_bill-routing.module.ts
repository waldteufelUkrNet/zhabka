import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P2pBillComponent } from './p2p_bill.component';

const routes: Routes = [
    {
        path: '',
        component: P2pBillComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class P2pBillRoutingModule {}
