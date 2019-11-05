import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxRemoteConfigService } from 'ngx-remote-config';
import { Observable } from 'rxjs';

@Component({
  selector: 'use-service',
  templateUrl: './use-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UseServiceComponent {
  config$: Observable<any>;
  constructor(private _ngxRemoteConfigService: NgxRemoteConfigService) {
    this.config$ = this._ngxRemoteConfigService.config$.asObservable();
  }
  reloadRemoteConfig() {
    this._ngxRemoteConfigService.initConfig();
  }
}
