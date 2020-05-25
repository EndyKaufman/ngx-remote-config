import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NGX_REMOTE_CONFIG } from './ngx-remote-config.config';
import { INgxRemoteConfig } from './ngx-remote-config.interface';
import { NgxRemoteConfigService } from './ngx-remote-config.service';

@Injectable()
export class NgxRemoteConfigInterceptor implements HttpInterceptor {
  constructor(
    @Inject(NGX_REMOTE_CONFIG) private _options: INgxRemoteConfig,
    private _ngxRemoteConfigService: NgxRemoteConfigService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this._options.withoutIterceptor && request.url !== this._options.url) {
      const response = this._ngxRemoteConfigService.get(request.url, request.method);
      if (response !== undefined && typeof response === 'string') {
        const requestWithCustomUrl = request.clone({
          url: response,
        });
        if (this._options.debug) {
          console.group('NgxRemoteConfig:UrlReplace');
          console.log('url', request.url);
          console.log('method', request.method);
          console.log('request', requestWithCustomUrl);
          console.groupEnd();
        }
        return next.handle(requestWithCustomUrl);
      }
      if (
        response !== undefined &&
        (!response || (response && response.body === undefined && response.status === undefined))
      ) {
        return new Observable((observer) => {
          const httpResponse = new HttpResponse<any>({
            body: response,
          });
          if (this._options.debug) {
            console.group('NgxRemoteConfig:BodyReplace');
            console.log('url', request.url);
            console.log('method', request.method);
            console.log('response', httpResponse);
            console.groupEnd();
          }
          observer.next(httpResponse);
          observer.complete();
        });
      }
      if (response !== undefined && response.body !== undefined && response.status !== undefined) {
        return new Observable((observer) => {
          if (+response.status >= 400) {
            const httpResponse = new HttpErrorResponse({
              error: response.body,
              ...(response.headers ? { headers: new HttpHeaders(response.headers) } : {}),
              status: response.status,
            });
            if (this._options.debug) {
              console.group('NgxRemoteConfig:ErrorResponseReplace');
              console.log('url', request.url);
              console.log('method', request.method);
              console.log('response', httpResponse);
              console.groupEnd();
            }
            observer.error(httpResponse);
          } else {
            const httpResponse = new HttpResponse<any>({
              body: response.body,
              ...(response.headers ? { headers: new HttpHeaders(response.headers) } : {}),
              status: response.status,
            });
            if (this._options.debug) {
              console.group('NgxRemoteConfig:ResponseReplace');
              console.log('url', request.url);
              console.log('method', request.method);
              console.log('response', httpResponse);
              console.groupEnd();
            }
            observer.next(httpResponse);
          }
          observer.complete();
        });
      }
    }
    return next.handle(request);
  }
}
