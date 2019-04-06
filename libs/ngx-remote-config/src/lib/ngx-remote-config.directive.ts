import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxRemoteConfigService } from './ngx-remote-config.service';

interface NgxRemoteConfigDirectiveContext {
  $implicit: any;
}

@Directive({
  selector: '[remoteConfig]'
})
export class NgxRemoteConfigDirective implements OnInit, OnDestroy {
  private _context: NgxRemoteConfigDirectiveContext | null = null;
  private _viewRef: EmbeddedViewRef<NgxRemoteConfigDirectiveContext>;
  private _destroyed$ = new Subject<boolean>();
  constructor(
    private _ngxRemoteConfigService: NgxRemoteConfigService,
    private _templateRef: TemplateRef<NgxRemoteConfigDirectiveContext>,
    private _viewContainerRef: ViewContainerRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this._context = {
      $implicit: this._ngxRemoteConfigService.config$.getValue()
    };
    this._ngxRemoteConfigService.config$.pipe(takeUntil(this._destroyed$)).subscribe(config => {
      this._context.$implicit = this._ngxRemoteConfigService.config$.getValue();
      this._changeDetectorRef.markForCheck();
    });
  }
  ngOnInit(): void {
    this._viewContainerRef.createEmbeddedView(this._templateRef, this._context);
  }
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
    this._viewContainerRef.clear();
    if (this._viewRef) {
      this._viewRef.destroy();
      this._viewRef = null;
    }
  }
}
