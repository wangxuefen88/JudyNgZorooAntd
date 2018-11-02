import { Component, OnInit } from '@angular/core';
import { MyeditorComponent } from 'app/workspace/myeditor/myeditor.component';

@Component({
  selector: 'app-myeditdemo',
  templateUrl: './myeditdemo.component.html',
  styleUrls: ['./myeditdemo.component.less']
})
export class MyeditdemoComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {

  }

      // 简单将内容打印出来
    keyupHandler(event: any) { 
    console.log(event)

   }
}
