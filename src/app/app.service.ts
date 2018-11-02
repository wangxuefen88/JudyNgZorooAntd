import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // 标题
  titleEventEmitter: EventEmitter<string>;

  constructor() {
    this.titleEventEmitter = new EventEmitter();
  }
}
