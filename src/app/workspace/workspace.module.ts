import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { workspaceRoutes } from 'app/workspace/workspace.routes';
import { WorkspaceComponent } from 'app/workspace/workspace.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TableComponent } from './table/table.component';
import { TreeContrutsComponent } from 'app/workspace/tree-contruts/tree-contruts.component';
import { EditComponent } from 'app/workspace/edit/edit.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyeditorComponent } from 'app/workspace/myeditor/myeditor.component';
import { MyeditorModule } from 'app/workspace/myeditor/myeditor.module';
import { MyeditdemoComponent } from 'app/workspace/myeditdemo/myeditdemo.component';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    HttpModule,
    MyeditorModule,
    RouterModule.forChild(workspaceRoutes)

  ],
  declarations: [WorkspaceComponent,
    TableComponent,
    TreeContrutsComponent,
    EditComponent,
    MyeditdemoComponent
  ]
})
export class WorkspaceModule { }
