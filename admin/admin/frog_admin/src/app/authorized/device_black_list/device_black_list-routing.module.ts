import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceBlackListComponent } from './device_black_list.component';

const routes: Routes = [
    {
        path: '',
        component: DeviceBlackListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeviceBlackListRoutingModule {}
