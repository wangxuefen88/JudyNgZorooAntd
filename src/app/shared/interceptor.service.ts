import {Injectable} from '@angular/core';
import {ConnectionBackend, Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { environment } from 'environments/environment';


@Injectable()
export class InterceptorService extends Http {


  /**
   *前后端交互响应码
   *
   * @author 杨晓风
   * @since 2018-10-23 15:23:48
   */
  status = {
    'status.400': '错误的请求。由于语法错误，该请求无法完成。',
    'status.401': '未经授权。服务器拒绝响应。',
    'status.403': '已禁止。服务器拒绝响应。',
    'status.404': '未找到。无法找到请求的位置。',
    'status.405': '方法不被允许。使用该位置不支持的请求方法进行了请求。',
    'status.406': '不可接受。服务器只生成客户端不接受的响应。',
    'status.407': '需要代理身份验证。客户端必须先使用代理对自身进行身份验证。',
    'status.408': '请求超时。等待请求的服务器超时。',
    'status.409': '冲突。由于请求中的冲突，无法完成该请求。',
    'status.410': '过期。请求页不再可用。',
    'status.411': '长度必需。未定义“内容长度”。',
    'status.412': '前提条件不满足。请求中给定的前提条件由服务器评估为 false。',
    'status.413': '请求实体太大。服务器不会接受请求，因为请求实体太大。',
    'status.414': '请求 URI 太长。服务器不会接受该请求，因为 URL 太长。',
    'status.415': '不支持的媒体类型。服务器不会接受该请求，因为媒体类型不受支持。',
    'status.416': 'HTTP 状态代码 {0}',
    'status.500': '内部服务器错误。',
    'status.501': '未实现。服务器不识别该请求方法，或者服务器没有能力完成请求。',
    'status.503': '服务不可用。服务器当前不可用(过载或故障)。'
  };

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  /**
   * URL统一拦截处理
   * @author 杨晓风
   * @since 2018-10-23 15:23:13
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    // 根据不同的生产环境配置http前缀
    if (typeof url === 'string') {
      const str = url.substring(0, url.indexOf('/'));
      switch (str) {
        case 'demo-web':
          url = url.replace('demo-web', environment.serverUrl);
          break;
      }

    } else {
      const str = url.url.substring(0, url.url.indexOf('/'));
      switch (str) {
        // 云平台
        case 'demo-web': 
          url.url = url.url.replace('demo-web', environment.serverUrl);
          break;
      }
    }

    return this.intercept(super.request(url, options));
  }

  /**
   * 前后端交互请求方法
   * @author 杨晓风
   * @since 2018-10-23 15:21:34
   */
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, this.getRequestOptionArgs(options)));

  }

  post(url: string, body?: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));

  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));

  }

  delete(url: string, obj?: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, this.getRequestOptionArgs(options, obj)));
  }

  /**
   * 预检请求参数进行处理
   * @author 杨晓风
   * @since 2018-10-23 15:21:09
   */
  getRequestOptionArgs(options?: RequestOptionsArgs, obj?: any): RequestOptionsArgs {
    const jwt = localStorage.getItem('Authorization');
    if (options == null) {
      options = new RequestOptions({}).merge(options);
    }
    const newHeaders = new Headers(options.headers);
    if (jwt) {
      newHeaders.set('Authorization', jwt);
    }
    newHeaders.set('Content-Type', 'application/json');
    options.headers = newHeaders;
    options =
      (
        {
          headers: options.headers,
          body: obj
        }
      );
    return options;
  }

  /**
   * 
   * @param observable 交互结果对象
   * @author 杨晓风
   * @since 2018-10-23 15:20:29
   */
  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      if (err.status < 200 || err.status >= 300) {
        return Observable.empty();
      } else {
        return Observable.throw(err);
      }
    });
  }


  /**
   * 不走上述拦截器,对url进行处理且重新返回URL的方法
   * @param url 与后台交互的URL
   * @param options 预检请求参数
   * @author 杨晓风
   * @since 2018-10-23 15:19:48
   */
  public getServerUrl(url: string, options?: RequestOptionsArgs) {
    const str = url.substring(0, url.indexOf('/'));
    switch (str) {
      case 'demo-web':
        url = url.replace('demo-web', environment.serverUrl);
        break;
    }
    return url;
  }

}
