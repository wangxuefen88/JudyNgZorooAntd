import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
Router
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.less']
})
export class WorkspaceComponent implements OnInit {
  
  ngOnInit(): void {
    
  }
  constructor(public router:Router){

  }
  isCollapsed = false;
  isReverseArrow = false;
  width = 200;

  table(){
    this.router.navigateByUrl('workspace/table');
  }
  tree(){
    this.router.navigateByUrl('workspace/treecontruts');
  }
  edit(){
    this.router.navigateByUrl('workspace/myeditordemo');
  }
}
