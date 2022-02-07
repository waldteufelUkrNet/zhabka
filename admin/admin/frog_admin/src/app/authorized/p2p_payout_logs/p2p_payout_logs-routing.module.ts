import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P2pPayoutLogsComponent } from './p2p_payout_logs.component';

const routes: Routes = [
    {
        path: '',
        component: P2pPayoutLogsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class P2pPayoutLogsRoutingModule {}
