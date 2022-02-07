import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedComponent } from './authorized.component';

const routes: Routes = [
    {
        path: '',
        component: AuthorizedComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
            { path: 'device_black_list', loadChildren: () => import('./device_black_list/device_black_list.module').then(m => m.DeviceBlackListModule) },
            { path: 'offer', loadChildren: () => import('./offer/offer.module').then(m => m.OfferModule) },
            { path: 'statistics', loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule) },
            { path: 'versions', loadChildren: () => import('./version/version.module').then(m => m.VersionModule) },


            { path: 'feedback', loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule) },
            { path: 'feedback_email', loadChildren: () => import('./feedback_email/feedback_email.module').then(m => m.FeedbackEmailModule) },
            { path: 'merchants', loadChildren: () => import('./merchant/merchant.module').then(m => m.MerchantModule) },


            { path: 'payments', loadChildren: () => import('./bill/bill.module').then(m => m.BillModule) },
            { path: 'p2p_payments', loadChildren: () => import('./p2p_bill/p2p_bill.module').then(m => m.P2pBillModule) },
            { path: 'p2p_payouts', loadChildren: () => import('./p2p_payout/p2p_payout.module').then(m => m.P2pPayoutModule) },

            { path: 'p2p_payouts_logs', loadChildren: () => import('./p2p_payout_logs/p2p_payout_logs.module').then(m => m.P2pPayoutLogsModule) },

            { path: 'mcc_lib', loadChildren: () => import('./mcc_lib/mcc_lib.module').then(m => m.MccLibModule) },
            { path: 'merchant_mcc', loadChildren: () => import('./merchant_mcc/merchant_mcc.module').then(m => m.MerchantMccModule) },

            { path: '**', redirectTo: 'not-found' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorizedRoutingModule {}


