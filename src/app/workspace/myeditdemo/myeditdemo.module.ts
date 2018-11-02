import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyeditdemoComponent } from 'app/workspace/myeditdemo/myeditdemo.component';
import { MyeditorModule } from 'app/workspace/myeditor/myeditor.module';


@NgModule({
  imports: [
    CommonModule,
    MyeditorModule
  ],
  declarations: [MyeditdemoComponent,MyeditdemoComponent],
   
})
export class MyeditordemoModule { }
