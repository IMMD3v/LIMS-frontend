import { Component, OnInit } from '@angular/core';
import { ContainerListComponent } from "../container/container-list/container-list.component";
import { LiquidListComponent } from "../liquid/liquid-list/liquid-list.component";
import { AnalysisListComponent } from "../analysis/analysis-list/analysis-list.component";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ ContainerListComponent, LiquidListComponent, AnalysisListComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  constructor(
  ) {}

  ngOnInit(): void {
  }

}
