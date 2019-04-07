import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as dot from 'dot-object';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NGX_REMOTE_CONFIG } from './ngx-remote-config.config';
import { INgxRemoteConfig } from './ngx-remote-config.interface';

declare var require: any;
const pathToRegexp = require('path-to-regexp');

export function appInitialize(ngxRemoteConfigService: NgxRemoteConfigService) {
  return () => ngxRemoteConfigService.initConfigAsync();
}

@Injectable()
export class NgxRemoteConfigService<T = any> {
  config$ = new BehaviorSubject<T>(undefined);
  constructor(@Inject(NGX_REMOTE_CONFIG) private _options: INgxRemoteConfig, private _httpClient: HttpClient) {}
  initConfigAsync() {
    return new Promise(resolve =>
      this._httpClient
        .get<T>(this._options.url)
        .pipe(catchError(error => of({} as T)))
        .subscribe(data => {
          this.config$.next(data);
          resolve(data);
        })
    );
  }
  initConfig() {
    this.initConfigAsync();
  }
  get(path: string, method = '') {
    let response = null;
    let founded = false;
    const config = this.config$.getValue();
    const dotConfig = dot.dot(config);
    const isHttp = path.indexOf('http://') !== 0;
    const isHttps = path.indexOf('https://') !== 0;
    const domain = isHttp || isHttps ? path.replace('http://', '').replace('https://', '') : path;

    if (!founded) {
      const url = [domain].join('.').replace(/(^\.+|\.+$)/gm, '');
      ({ response, founded } = this.matchUrl(dotConfig, config, url, method.toLowerCase(), response, founded));
    }
    if (!founded) {
      const url = [...domain.split('/')]
        .filter(i => i)
        .join('.')
        .replace(/(^\.+|\.+$)/gm, '');
      ({ response, founded } = this.matchUrl(dotConfig, config, url, method.toLowerCase(), response, founded));
    }
    if (founded) {
      if (typeof response === 'string') {
        if (response.indexOf('https://') !== 0 && response.indexOf('http://') !== 0) {
          return isHttps ? `https://${response}` : isHttp ? `http://${response}` : response;
        }
      }
      return response;
    }
    return undefined;
  }
  private matchUrl(dotConfig: any, config: T, url: string, method: string, response: any, founded: boolean) {
    let objectValue;
    objectValue = dot.pick(`${url}.${method}`, config);
    if (objectValue !== undefined) {
      return { response: objectValue, founded: true };
    }
    objectValue = dot.pick(url, config);
    if (objectValue !== undefined) {
      return { response: objectValue, founded: true };
    }
    Object.keys(dotConfig).forEach(dotKey => {
      const regexp = pathToRegexp(dotKey);
      const value = dotConfig[dotKey];
      const matched = regexp.exec(url);
      if (value !== undefined && matched && !founded) {
        if (response !== undefined) {
          response = value + matched[1];
          founded = true;
        }
      }
    });
    return { response, founded };
  }

  appInitialize() {
    if (this._options.notLockAppInitialize) {
      this.initConfig();
      return Promise.resolve(true);
    }
    return this.initConfigAsync();
  }
}
