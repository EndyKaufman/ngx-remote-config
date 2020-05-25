import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as dot from 'dot-object';
import { pathToRegexp } from 'path-to-regexp';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NGX_REMOTE_CONFIG } from './ngx-remote-config.config';
import { INgxRemoteConfig } from './ngx-remote-config.interface';

export function initializeApp(ngxRemoteConfigService: NgxRemoteConfigService) {
  return () => ngxRemoteConfigService.initConfigAsync();
}

@Injectable()
export class NgxRemoteConfigService<T = any> {
  config$ = new BehaviorSubject<T>(undefined);
  constructor(@Inject(NGX_REMOTE_CONFIG) private _options: INgxRemoteConfig, private _httpClient: HttpClient) {}
  initConfigAsync() {
    if (this._options.debug) {
      console.group('NgxRemoteConfig:Init');
      console.log('url', this._options.url);
      console.log('default', this._options.default);
    }
    return this._httpClient
      .get<T>(this._options.url)
      .pipe(
        catchError((error) => {
          if (this._options.debug) {
            console.log('error', error);
          }
          return of((this._options.default || {}) as T);
        }),
        tap((data: T) => {
          if (this._options.debug) {
            console.log('data', data);
            console.groupEnd();
          }
          this.config$.next(data);
        })
      )
      .toPromise();
  }
  initConfig() {
    this.initConfigAsync().then();
  }
  get(path: string, method = '') {
    let response = null;
    let founded = false;
    const config = this.config$.getValue();
    const dotConfig = dot.dot(config || {});
    const isHttp = path.indexOf('http://') !== 0;
    const isHttps = path.indexOf('https://') !== 0;
    const domain = isHttp || isHttps ? path.replace('http://', '').replace('https://', '') : path;
    if (!founded) {
      try {
        const url = [domain].join('.').replace(/(^\.+|\.+$)/gm, '');
        ({ response, founded } = this.matchUrl(dotConfig, config, url, method.toLowerCase(), response, founded));
      } catch (error) {}
    }
    if (!founded) {
      try {
        const url = [...domain.split('/')]
          .filter((i) => i)
          .join('.')
          .replace(/(^\.+|\.+$)/gm, '');
        ({ response, founded } = this.matchUrl(dotConfig, config, url, method.toLowerCase(), response, founded));
      } catch (error) {}
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
    objectValue = dot.pick(`${url}.${method}`, config || {});
    if (objectValue !== undefined) {
      if (this._options.debugMatchUrl) {
        console.group('NgxRemoteConfig:matchUrl:url+method');
        console.log('dotConfig', dotConfig);
        console.log('config', config);
        console.log('url', url);
        console.log('method', method);
        console.log('response', objectValue);
        console.log('founded', true);
        console.groupEnd();
      }
      return { response: objectValue, founded: true };
    }
    objectValue = dot.pick(url, config || {});
    if (objectValue !== undefined) {
      if (this._options.debugMatchUrl) {
        console.group('NgxRemoteConfig:matchUrl:url');
        console.log('dotConfig', dotConfig);
        console.log('config', config);
        console.log('url', url);
        console.log('method', method);
        console.log('response', objectValue);
        console.log('founded', true);
        console.groupEnd();
      }
      return { response: objectValue, founded: true };
    }
    const dotConfigKeys = Object.getOwnPropertyNames(dotConfig).reverse();
    const dotConfigKeysLength = dotConfigKeys.length;
    let dotKey;
    for (let i = 0; i < dotConfigKeysLength; i++) {
      if (!founded) {
        dotKey = dotConfigKeys[i];
        const regexp = pathToRegexp(dotKey);
        const value = dotConfig[dotKey];
        const matched = regexp.exec(url);
        if (value !== undefined && matched) {
          if (response !== undefined) {
            response = value + matched[1];
            founded = true;
          }
        }
      }
    }
    if (this._options.debugMatchUrl) {
      console.group('NgxRemoteConfig:matchUrl');
      console.log('dotConfig', dotConfig);
      console.log('config', config);
      console.log('url', url);
      console.log('method', method);
      console.log('response', response);
      console.log('founded', founded);
      console.groupEnd();
    }
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
