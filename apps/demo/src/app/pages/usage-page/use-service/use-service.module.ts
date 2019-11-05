import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { NgxRemoteConfigModule } from 'ngx-remote-config';
import { SharedModule } from '../../../shared/shared.module';
import { UseServiceComponent } from './use-service.component';

@NgModule({
  imports: [SharedModule, NgxRemoteConfigModule, MatInputModule, MatButtonModule],
  declarations: [UseServiceComponent],
  exports: [UseServiceComponent]
})
export class UseServiceModule {}
