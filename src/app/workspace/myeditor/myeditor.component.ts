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
      selector: '#' + this.elementId, //id 属性绑定在父组件上    
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