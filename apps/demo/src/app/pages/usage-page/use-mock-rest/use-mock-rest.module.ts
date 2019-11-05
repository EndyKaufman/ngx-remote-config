import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { NgxRemoteConfigModule } from 'ngx-remote-config';
import { SharedModule } from '../../../shared/shared.module';
import { UseMockRestComponent } from './use-mock-rest.component';

@NgModule({
  imports: [SharedModule, NgxRemoteConfigModule, MatInputModule, MatButtonModule],
  declarations: [UseMockRestComponent],
  exports: [UseMockRestComponent]
})
export class UseMockRestModule {}
