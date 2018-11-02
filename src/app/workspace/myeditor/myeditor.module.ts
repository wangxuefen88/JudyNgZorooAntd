import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyeditorComponent } from 'app/workspace/myeditor/myeditor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MyeditorComponent],
    //对外提供的组件，全部放到exports里  
 exports:[MyeditorComponent]
})
export class MyeditorModule { }
