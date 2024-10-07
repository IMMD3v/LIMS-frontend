import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { ContainerNewEditComponent } from './components/container-new-edit/container-new-edit.component';
import { ContainerDetailsComponent } from './components/container-details/container-details.component';

export const routes: Routes = [
    {path: '', component: ContentComponent},
    { path: 'editContainer/:id', component: ContainerNewEditComponent},
    { path: 'newContainer', component: ContainerNewEditComponent},
    { path: 'contDetails/:id', component: ContainerDetailsComponent},
];
