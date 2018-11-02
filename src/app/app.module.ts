import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {registerLocaleData, HashLocationStrategy, LocationStrategy} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {appRoutes} from './app.routes';
import {InterceptorService} from './shared/interceptor.service';
import {AppService} from './app.service';
import { ShoweditComponent } from './showedit/showedit.component';
import { MyeditorModule } from 'app/workspace/myeditor/myeditor.module';

registerLocaleData(zh);

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions) {
  const service = new InterceptorService(xhrBackend, requestOptions);
  return service;
}

@NgModule({
  declarations: [
    AppComponent,
    ShoweditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgZorroAntdModule,
    MyeditorModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: InterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions]
    },
    AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
