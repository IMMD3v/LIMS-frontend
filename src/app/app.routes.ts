import { Routes } from '@angular/router';
import { ContainerNewEditComponent } from './components/container-new-edit/container-new-edit.component';
import { ContainerDetailsComponent } from './components/container-details/container-details.component';
import { ContentComponent } from './components/content/content.component';
import { LiquidNewEditComponent } from './components/liquid-new-edit/liquid-new-edit.component';

export const routes: Routes = [
    {path: '', component: ContentComponent}, //should change later
    { path: 'editContainer/:id', component: ContainerNewEditComponent},
    { path: 'newContainer', component: ContainerNewEditComponent},
    { path: 'contDetails/:id', component: ContainerDetailsComponent},
    { path: 'editLiquid/:id', component: LiquidNewEditComponent},
    { path: 'newLiquid', component: LiquidNewEditComponent},
];
