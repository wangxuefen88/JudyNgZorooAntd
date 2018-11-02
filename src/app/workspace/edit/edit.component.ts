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




