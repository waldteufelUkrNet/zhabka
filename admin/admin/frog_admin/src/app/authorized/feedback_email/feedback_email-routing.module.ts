import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackEmailComponent } from './feedback_email.component';

const routes: Routes = [
    {
        path: '',
        component: FeedbackEmailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeedbackEmailRoutingModule {}
