# JudyNgZorooAntd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

1 下载
npm install tinymce@4.8.4 --save
2 把tinymce放到assets


2.1.,在index.html引入js
<script type="text/javascript" src="assets/tinymce/tinymce.js"> </script>
  <script type="text/javascript" src="assets/tinymce/themes/modern/theme.js"> </script>
  <script type="text/javascript" src="assets/tinymce/plugins/link/plugin.js"> </script>
  <script type="text/javascript" src="assets/tinymce/plugins/paste/plugin.js"> </script>
  <script type="text/javascript" src="assets/tinymce/plugins/table/plugin.js"> </script>
  <script type="text/javascript" src="assets/zh_CN.js"> </script>


3 创建文件
typings.d.ts
/* SystemJS module definition */
declare var module: NodeModule;
declare var tinymce:any;
interface NodeModule {
  id: string;}
放到src目录下面
4 在创建的组件html
    <textarea id="myTextarea"  name="content" [(ngModel)]="doc" class="form-control" rows="30"     >
        </textarea>

5 在创建的组件ts
import { Component, OnInit } from '@angular/core';
import { InterceptorService } from 'app/shared/interceptor.service';
import { SytleModel } from 'app/workspace/edit/style-model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {

  constructor(
    public http: InterceptorService

  ) { }
  Textstyle =new SytleModel();
  ngOnInit() {

  }
  editor;
  content: any = '请输入';
  content1: any;
  ngAfterViewInit() {
    let self = this;
    if (this.editor) return;
    tinymce.init({
      selector: '#myTextarea',
      /**复制粘贴文本或者图片 */
      insert_button_items: 'image link | inserttable',
      paste_retain_style_properties: 'all',
      paste_word_valid_elements: '*[*]',        // word需要它
      paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
      paste_convert_word_fake_lists: false,     // 插入word文档需要该属性
      paste_webkit_styles: 'all',
      paste_merge_formats: true,
      nonbreaking_force_tab: false,
      paste_auto_cleanup_on_paste: false,
      /**设置使用的插件 */
      fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
      imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
      language: 'zh_CN',
      plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'save table contextmenu directionality emoticons template paste textcolor'
      ],
      height: "480",
      image_advtab: true,
      menubar: true,
      //每个编辑器实例初始化完成后都要执行一次
      init_instance_callback: function (editor) {
        setTimeout(function () {
          if (self.content === undefined) {
            editor.setContent('');
          } else {
            editor.setContent(self.content);
          }
        }, 1000)
      },

      setup: editor => {
        console.log(editor)
        editor.on('keyup change', () => {
          this.content = editor.getContent();
          console.log("输出内容" + editor.getContent())
          self.content = editor.getContent()
        })
      },
      ngOnDestroy() {
        tinymce.remove(this.editor);
      },




      /**
       * 上传图片
       */
      // images_upload_handler: function (blobInfo, success, failure) {
      //   var formData;
      //   formData = new FormData();
      //   formData.append('file', blobInfo.blob(), blobInfo.filename);
      //   const url = 'http://192.168.22.55:8084/demo-web/foo/queryAllFoo/1/10';
      //   this.http.post(url, formData).subscribe(
      //     res => {
      //       if (res.json().code === '0000') {
      //         alert("成功");
      //       } else {
      //         alert("失败");
      //       }
      //     }
      //   )
      // }
    })
  }

  commit() {   
    this.Textstyle.style=this.content;
    console.log("确认输出" + this.Textstyle.style)
   // const blob = new Blob([this.Textstyle.style]);
    const body=JSON.stringify({     
      style: this.Textstyle.style
    })
    const url = 'demo-web/style/create';
    this.http.post(url, body).subscribe(
      res => {
        if (res.json().code === '0000') {
          alert("成功");
          this.getedit()
        } else {
          alert("失败");
        }
      }
    )
  }
 getedit(){
   const url="http://localhost:8085/demo-web/style/queryPageAll/1/10";
   this.http.get(url).subscribe(
     res => {
       if(res.json().code === '0000'){
        this.content1=res.json().data;
        console.log(this.content1)
       }
     }
   )
  }
 }






1 组件化
html
<textarea id={{elementId}} > </textarea>

ts
import { Component, OnInit, OnDestroy, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'simple-tiny',
  templateUrl: './myeditor.component.html'
})

export class MyeditorComponent implements AfterViewInit, OnDestroy {

  @Input() elementId: String;

  @Output() onEditorKeyup = new EventEmitter();

  editor;
  content: any = '请输入';
  ngAfterViewInit() {
    let self = this;
    if (this.editor) return;
    tinymce.init({
      selector: '#' + this.elementId,

      /**复制粘贴文本或者图片 */
      insert_button_items: 'image link | inserttable',
      paste_retain_style_properties: 'all',
      paste_word_valid_elements: '*[*]',        // word需要它
      paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
      paste_convert_word_fake_lists: false,     // 插入word文档需要该属性
      paste_webkit_styles: 'all',
      paste_merge_formats: true,
      nonbreaking_force_tab: false,
      paste_auto_cleanup_on_paste: false,
      /**设置使用的插件 */
      fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
      imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
      language: 'zh_CN',
      plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'save table contextmenu directionality emoticons template paste textcolor'
      ],
      height: "480",
      image_advtab: true,
      menubar: true,

       skin_url: 'assets/tinymce/skins/lightgray',

      //每个编辑器实例初始化完成后都要执行一次
      init_instance_callback: function (editor) {
        setTimeout(function () {
          if (self.content === undefined) {
            editor.setContent('');
          } else {
            editor.setContent(self.content);
          }
        }, 1000)
      },
      setup: editor => {
        this.editor = editor; editor.on('keyup change', () => {
          this.content = editor.getContent();
          this.onEditorKeyup.emit(this.content);
        });

      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}



组件module
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




Appmodule引入模块
  MyeditorModule


workspacemodule引入模块
    MyeditorModule,


使用组件HTML
<simple-tiny [elementId]="'elementId'" (onEditorKeyup)="keyupHandler($event)">

        </simple-tiny>


组件ts
   // 简单将内容打印出来
    keyupHandler(event: any) { 
    console.log(event)

解释
@input表示从父作用域的值“输入”到子作用域
  @Input() elementId: String;
子组件
<simple-tiny [elementId]="'11111'" (onEditorKeyup)="keyupHandler($event)">

        </simple-tiny>




    <textarea id={{elementId}} > </textarea>

这个时候[elementId]会拿到11111,并且把这个数给
 selector: '#' + this.elementId, //id 属性绑定在父组件上
所以这个时候初始化只针对的是这个组件

注意: @Input()在那个里面则说明谁就是孩子

[elementId] 会监听


@output表示从子组件
 当子组件的click事件被触发，就执行父组件的eventHandler函数，并把子组件的参数$event.rating传递给父组件的eventHandler函数；就好像，当小孩子一哭（执行click事件），他的母亲立刻把他抱在怀里（执行母亲的eventHandler），同时母亲获得了小孩子的一些参数（$event.rating）
https://www.jb51.net/article/125414.htm






































