import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'use-mock-rest',
  templateUrl: './use-mock-rest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseMockRestComponent {
  mockRestSuccess$ = new Subject<any>();
  mockRestFail$ = new Subject<any>();
  constructor(private _httpClient: HttpClient) {}
  mockRestGetCustom() {
    this._httpClient.get('/api/action').subscribe(
      (data) => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      (error) => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestGetOneResource() {
    this._httpClient.get('/api/resource/1').subscribe(
      (data) => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      (error) => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestGetResource() {
    this._httpClient.get('/api/resource').subscribe(
      (data) => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      (error) => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestGetWithQueryResource() {
    this._httpClient.get('/api/resource?page=2&order=id,desc').subscribe(
      (data) => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      (error) => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestPostResource() {
    this._httpClient.post('/api/resource', { name: 'name' }).subscribe(
      (data) => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      (error) => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestPutResource() {
    this._httpClient.put('/api/resource/1', { name: 'name' }).subscribe(
      (data) => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      (error) => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestDeleteResource() {
    this._httpClient.delete('/api/resource/1').subscribe(
      (data) => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      (error) => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestGetOneErrorResource() {
    this._httpClient.get('/api/resource/2').subscribe(
      (data) => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      (error) => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestPutErrorResource() {
    this._httpClient.put('/api/resource/2', { name: 'name' }).subscribe(
      (data) => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      (error) => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
  mockRestDeleteErrorResource() {
    this._httpClient.delete('/api/resource/2').subscribe(
      (data) => {
        this.mockRestSuccess$.next(data);
        this.mockRestFail$.next(null);
      },
      (error) => {
        this.mockRestSuccess$.next(null);
        this.mockRestFail$.next(error);
      }
    );
  }
}
