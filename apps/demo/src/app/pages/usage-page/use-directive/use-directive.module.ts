import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { NgxRemoteConfigModule } from 'ngx-remote-config';
import { SharedModule } from '../../../shared/shared.module';
import { UseDirectiveComponent } from './use-directive.component';

@NgModule({
  imports: [SharedModule, NgxRemoteConfigModule, MatInputModule, MatButtonModule],
  declarations: [UseDirectiveComponent],
  exports: [UseDirectiveComponent]
})
export class UseDirectiveModule {}
