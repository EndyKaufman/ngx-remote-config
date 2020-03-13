import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxRemoteConfigModule } from 'ngx-remote-config';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { MessageBoxModule } from './components/message-box/message-box.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { SharedModule } from './shared/shared.module';
import { MyErrorStateMatcher } from './shared/utils/my-error-state-matcher';
import { MarkdownModule } from 'ngx-markdown';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MarkdownModule.forRoot(),
    SharedModule,
    MessageBoxModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ngx-remote-config' }),
    NavbarModule,
    NgxRemoteConfigModule.forRoot({
      url: environment.remoteConfig,
      notLockAppInitialize: true,
      debug: true
    }),
    RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: MyErrorStateMatcher },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
