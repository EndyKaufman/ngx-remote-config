import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { DEFAULT_NGX_REMOTE_CONFIG, NGX_REMOTE_CONFIG } from './ngx-remote-config.config';
import { NgxRemoteConfigDirective } from './ngx-remote-config.directive';
import { NgxRemoteConfigInterceptor } from './ngx-remote-config.interceptor';
import { INgxRemoteConfig } from './ngx-remote-config.interface';
import { appInitialize, NgxRemoteConfigService } from './ngx-remote-config.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxRemoteConfigDirective],
  exports: [NgxRemoteConfigDirective]
})
export class NgxRemoteConfigModule {
  static forRoot(options?: INgxRemoteConfig): ModuleWithProviders {
    return {
      ngModule: NgxRemoteConfigModule,
      providers: [
        NgxRemoteConfigService,
        NgxRemoteConfigInterceptor,
        {
          provide: NGX_REMOTE_CONFIG,
          useValue: {
            url: options && options.url !== undefined ? options.url : DEFAULT_NGX_REMOTE_CONFIG.url,
            withoutIterceptor:
              options && options.withoutIterceptor !== undefined
                ? options.withoutIterceptor
                : DEFAULT_NGX_REMOTE_CONFIG.withoutIterceptor,
            notLockAppInitialize:
              options && options.notLockAppInitialize !== undefined
                ? options.notLockAppInitialize
                : DEFAULT_NGX_REMOTE_CONFIG.notLockAppInitialize
          }
        },
        ...(options.withoutAppInitialize
          ? []
          : [
              {
                provide: APP_INITIALIZER,
                useFactory: appInitialize,
                multi: true,
                deps: [NgxRemoteConfigService]
              }
            ]),
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: NgxRemoteConfigInterceptor,
          multi: true
        }
      ]
    };
  }
}
