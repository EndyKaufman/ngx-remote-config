import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { NgxRemoteConfigModule } from 'ngx-remote-config';
import { SharedModule } from '../../../shared/shared.module';
import { UseRestComponent } from './use-rest.component';

@NgModule({
  imports: [SharedModule, NgxRemoteConfigModule, MatInputModule, MatButtonModule],
  declarations: [UseRestComponent],
  exports: [UseRestComponent]
})
export class UseRestModule {}
