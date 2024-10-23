import { Routes } from '@angular/router';
import { ContainerNewEditComponent } from './components/container/container-new-edit/container-new-edit.component';
import { ContainerDetailsComponent } from './components/container/container-details/container-details.component';
import { ContentComponent } from './components/content/content.component';
import { LiquidNewEditComponent } from './components/liquid/liquid-new-edit/liquid-new-edit.component';
import { LiquidDetailsComponent } from './components/liquid/liquid-details/liquid-details.component';
import { LiquidMovementsComponent } from './components/liquid-movements/liquid-movements.component';
import { AnalysisDetailsComponent } from './components/analysis/analysis-details/analysis-details.component';
import { AnalysisNewEditComponent } from './components/analysis/analysis-new-edit/analysis-new-edit.component';

export const routes: Routes = [
    {path: '', component: ContentComponent}, //should change later
    { path: 'editContainer', component: ContainerNewEditComponent},
    { path: 'newContainer', component: ContainerNewEditComponent},
    { path: 'contDetails', component: ContainerDetailsComponent},
    { path: 'liquidDetails', component: LiquidDetailsComponent},
    { path: 'analysisDetails', component: AnalysisDetailsComponent},
    { path: 'newAnalysis', component: AnalysisNewEditComponent},
    { path: 'editAnalysis', component: AnalysisNewEditComponent},
    { path: 'editLiquid', component: LiquidNewEditComponent},
    { path: 'newLiquid', component: LiquidNewEditComponent},
    { path: 'liquidMovements', component: LiquidMovementsComponent},
];
