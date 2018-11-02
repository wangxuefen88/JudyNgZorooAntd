import { WorkspaceComponent } from './workspace.component';
import { TableComponent } from 'app/workspace/table/table.component';
import { TreeContrutsComponent } from 'app/workspace/tree-contruts/tree-contruts.component';
import { EditComponent } from 'app/workspace/edit/edit.component';
import { MyeditdemoComponent } from 'app/workspace/myeditdemo/myeditdemo.component';
import { MyeditorComponent } from 'app/workspace/myeditor/myeditor.component';

export const workspaceRoutes = [
    {
        path: '',
        component: WorkspaceComponent,
        children: [
            {
                path: '', redirectTo: 'edit', pahtMatch: 'full'
            },
            { path: 'table', component: TableComponent },
            { path: 'treecontruts', component: TreeContrutsComponent },
            { path: 'edit', component: EditComponent },
            {path:'myeditordemo',component:MyeditdemoComponent}
        ]
    }
]