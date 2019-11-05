import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'use-rest',
  templateUrl: './use-rest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UseRestComponent {
  restSuccess$ = new Subject<any>();
  restFail$ = new Subject<any>();
  constructor(private _httpClient: HttpClient) {}
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
  restGetOneResource() {
    this._httpClient.get('/api/projects/1?custom=value').subscribe(
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
