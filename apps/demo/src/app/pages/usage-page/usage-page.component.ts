import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxRemoteConfigService } from 'ngx-remote-config';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'usage-page',
  templateUrl: './usage-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsagePageComponent {
  sources = {
    directive: {
      html: `<ng-container *remoteConfig="let config">
    <h1>{{config?.options?.name}}</h1>
    <h3>{{config?.options?.description}}</h3>
    <mat-form-field
        floatLabel="always"
        class="full-width"
        appearance="fill">
        <mat-label>Config</mat-label>
        <textarea
            readonly="true"
            matInput
            cdkTextareaAutosize
            cdkAutosizeMinRows="2"
            cdkAutosizeMaxRows="10"
            [innerHtml]="config?.options|customJson">
        </textarea>
    </mat-form-field>
</ng-container>`
    },
    service: {
      html: `<mat-form-field
    floatLabel="always"
    class="full-width"
    appearance="fill">
    <mat-label>Config</mat-label>
    <textarea
        readonly="true"
        matInput
        cdkTextareaAutosize
        cdkAutosizeMinRows="2"
        cdkAutosizeMaxRows="10"
        [innerHtml]="config$|async|customJson">
    </textarea>
</mat-form-field>
<button
    mat-raised-button
    color="primary"
    (click)="reloadRemoteConfig()">
    Reload remote config
</button>`,
      ts: `config$: Observable<any>;
constructor(
  private _httpClient: HttpClient,
  private _ngxRemoteConfigService: NgxRemoteConfigService
) {
  this.config$ = this._ngxRemoteConfigService.config$.asObservable();
}
reloadRemoteConfig() {
  this._ngxRemoteConfigService.initConfig();
}`
    },
    mockRest: {
      html: `<mat-form-field
    floatLabel="always"
    class="full-width"
    appearance="fill">
    <mat-label>Success</mat-label>
    <textarea
        readonly="true"
        matInput
        cdkTextareaAutosize
        cdkAutosizeMinRows="2"
        cdkAutosizeMaxRows="10"
        [innerHtml]="mockRestSuccess$|async|customJson">
    </textarea>
</mat-form-field>
<mat-form-field
    floatLabel="always"
    class="full-width"
    appearance="fill">
    <mat-label>Fail</mat-label>
    <textarea
        readonly="true"
        matInput
        cdkTextareaAutosize
        cdkAutosizeMinRows="2"
        cdkAutosizeMaxRows="10"
        [innerHtml]="mockRestFail$|async|customJson">
    </textarea>
</mat-form-field>
<button
    mat-raised-button
    color="primary"
    (click)="mockRestGetCustom()">
    get: custom
</button>
<button
    mat-raised-button
    color="secondary"
    (click)="mockRestGetOneResource()">
    get one: rest
</button>
<button
    mat-raised-button
    color="primary"
    (click)="mockRestGetResource()">
    get: rest
</button>
<button
    mat-raised-button
    color="secondary"
    (click)="mockRestPostResource()">
    post: rest
</button>
<button
    mat-raised-button
    color="primary"
    (click)="mockRestPutResource()">
    put: rest
</button>
<button
    mat-raised-button
    color="secondary"
    (click)="mockRestDeleteResource()">
    delete: rest
</button>
<button
    mat-raised-button
    color="primary"
    (click)="mockRestGetOneErrorResource()">
    get one: rest error
</button>
<button
    mat-raised-button
    color="secondary"
    (click)="mockRestPutErrorResource()">
    put: rest error
</button>
<button
    mat-raised-button
    color="primary"
    (click)="mockRestDeleteErrorResource()">
    delete: rest error
</button>`,
      ts: `mockRestSuccess$ = new Subject<any>();
mockRestFail$ = new Subject<any>();
constructor(
  private _httpClient: HttpClient,
  private _ngxRemoteConfigService: NgxRemoteConfigService
) {
}
mockRestGetCustom() {
    this._httpClient.get('/api/action').subscribe(
      data => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      error => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
mockRestGetOneResource() {
  this._httpClient.get('/api/resource/1').subscribe(
    data => this.mockRestSuccess$.next(data),
    error => this.mockRestFail$.next(error)
  );
}
mockRestGetResource() {
  this._httpClient.get('/api/resource').subscribe(
    data => this.mockRestSuccess$.next(data),
    error => this.mockRestFail$.next(error)
  );
}
mockRestPostResource() {
  this._httpClient.post('/api/resource', { name: 'name' }).subscribe(
    data => this.mockRestSuccess$.next(data),
    error => this.mockRestFail$.next(error)
  );
}
mockRestPutResource() {
  this._httpClient.put('/api/resource/1', { name: 'name' }).subscribe(
    data => this.mockRestSuccess$.next(data),
    error => this.mockRestFail$.next(error)
  );
}
mockRestDeleteResource() {
  this._httpClient.delete('/api/resource/1').subscribe(
    data => this.mockRestSuccess$.next(data),
    error => this.mockRestFail$.next(error)
  );
}
mockRestGetOneErrorResource() {
  this._httpClient.get('/api/resource/2').subscribe(
    data => this.mockRestSuccess$.next(data),
    error => this.mockRestFail$.next(error)
  );
}
mockRestPutErrorResource() {
  this._httpClient.put('/api/resource/2', { name: 'name' }).subscribe(
    data => this.mockRestSuccess$.next(data),
    error => this.mockRestFail$.next(error)
  );
}
mockRestDeleteErrorResource() {
  this._httpClient.delete('/api/resource/2').subscribe(
    data => this.mockRestSuccess$.next(data),
    error => this.mockRestFail$.next(error)
  );
}`
    },
    realRest: {
      html: `<mat-form-field
    floatLabel="always"
    class="full-width"
    appearance="fill">
    <mat-label>Success</mat-label>
    <textarea
        readonly="true"
        matInput
        cdkTextareaAutosize
        cdkAutosizeMinRows="2"
        cdkAutosizeMaxRows="10"
        [innerHtml]="restSuccess$|async|customJson">
    </textarea>
</mat-form-field>
<mat-form-field
    floatLabel="always"
    class="full-width"
    appearance="fill">
    <mat-label>Fail</mat-label>
    <textarea
        readonly="true"
        matInput
        cdkTextareaAutosize
        cdkAutosizeMinRows="2"
        cdkAutosizeMaxRows="10"
        [innerHtml]="restFail$|async|customJson">
    </textarea>
</mat-form-field>
<button
    mat-raised-button
    color="primary"
    (click)="restGetResource()">
    get: rest
</button>
<button
    mat-raised-button
    color="secondary"
    (click)="restGetOneErrorResource()">
    get one: rest error
</button>
<button
    mat-raised-button
    color="primary"
    (click)="restPutErrorResource()">
    put: rest error
</button>
<button
    mat-raised-button
    color="secondary"
    (click)="restDeleteErrorResource()">
    delete: rest error
</button>`,
      ts: `restSuccess$ = new Subject<any>();
restFail$ = new Subject<any>();
constructor(
  private _httpClient: HttpClient,
  private _ngxRemoteConfigService: NgxRemoteConfigService
) {
}
restGetResource() {
  this._httpClient.get('/api/projects').subscribe(
    data => this.restSuccess$.next(data),
    error => this.restFail$.next(error)
  );
}
restGetOneErrorResource() {
  this._httpClient.get('/api/resource/3').subscribe(
    data => this.restSuccess$.next(data),
    error => this.restFail$.next(error)
  );
}
restPutErrorResource() {
  this._httpClient.put('/api/resource/3', { name: 'name' }).subscribe(
    data => this.restSuccess$.next(data),
    error => this.restFail$.next(error)
  );
}
restDeleteErrorResource() {
  this._httpClient.delete('/api/resource/3').subscribe(
    data => this.restSuccess$.next(data),
    error => this.restFail$.next(error)
  );
}`
    }
  };
  mockRestSuccess$ = new Subject<any>();
  mockRestFail$ = new Subject<any>();
  restSuccess$ = new Subject<any>();
  restFail$ = new Subject<any>();
  config$: Observable<any>;
  constructor(private _httpClient: HttpClient, private _ngxRemoteConfigService: NgxRemoteConfigService) {
    this.config$ = this._ngxRemoteConfigService.config$.asObservable();
  }
  reloadRemoteConfig() {
    this._ngxRemoteConfigService.initConfig();
  }
  mockRestGetCustom() {
    this._httpClient.get('/api/action').subscribe(
      data => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      error => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestGetOneResource() {
    this._httpClient.get('/api/resource/1').subscribe(
      data => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      error => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestGetResource() {
    this._httpClient.get('/api/resource').subscribe(
      data => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      error => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestPostResource() {
    this._httpClient.post('/api/resource', { name: 'name' }).subscribe(
      data => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      error => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestPutResource() {
    this._httpClient.put('/api/resource/1', { name: 'name' }).subscribe(
      data => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      error => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestDeleteResource() {
    this._httpClient.delete('/api/resource/1').subscribe(
      data => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      error => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestGetOneErrorResource() {
    this._httpClient.get('/api/resource/2').subscribe(
      data => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      error => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestPutErrorResource() {
    this._httpClient.put('/api/resource/2', { name: 'name' }).subscribe(
      data => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      error => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestDeleteErrorResource() {
    this._httpClient.delete('/api/resource/2').subscribe(
      data => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      error => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  restGetResource() {
    this._httpClient.get('/api/projects').subscribe(
      data => {
        this.restSuccess$.next(data);
        this.restFail$.next(null);
      },
      error => {
        this.restSuccess$.next(null);
        this.restFail$.next(error);
      }
    );
  }
  restGetOneErrorResource() {
    this._httpClient.get('/api/resource/3').subscribe(
      data => {
        this.restSuccess$.next(data);
        this.restFail$.next(null);
      },
      error => {
        this.restSuccess$.next(null);
        this.restFail$.next(error);
      }
    );
  }
  restPutErrorResource() {
    this._httpClient.put('/api/resource/3', { name: 'name' }).subscribe(
      data => {
        this.restSuccess$.next(data);
        this.restFail$.next(null);
      },
      error => {
        this.restSuccess$.next(null);
        this.restFail$.next(error);
      }
    );
  }
  restDeleteErrorResource() {
    this._httpClient.delete('/api/resource/3').subscribe(
      data => {
        this.restSuccess$.next(data);
        this.restFail$.next(null);
      },
      error => {
        this.restSuccess$.next(null);
        this.restFail$.next(error);
      }
    );
  }
}
