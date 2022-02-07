import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P2pPayoutComponent } from './p2p_payout.component';

const routes: Routes = [
    {
        path: '',
        component: P2pPayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class P2pPayoutRoutingModule {}
