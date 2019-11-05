import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'use-directive',
  templateUrl: './use-directive.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UseDirectiveComponent {}
