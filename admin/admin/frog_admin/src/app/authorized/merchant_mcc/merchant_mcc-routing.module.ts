import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantMccComponent } from './merchant_mcc.component';

const routes: Routes = [
    {
        path: '',
        component: MerchantMccComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MerchantMccRoutingModule {}
