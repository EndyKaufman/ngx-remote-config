import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { NgxRemoteConfigModule } from 'ngx-remote-config';
import { DocsExampleModule } from '../../components/docs-example/docs-example.module';
import { SourceTabsModule } from '../../components/source-tabs/source-tabs.module';
import { SharedModule } from '../../shared/shared.module';
import { UsagePageComponent } from './usage-page.component';
import { UsagePageRoutes } from './usage-page.routes';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(UsagePageRoutes),
    MarkdownModule.forRoot(),
    DocsExampleModule.forRoot(),
    SourceTabsModule,
    NgxRemoteConfigModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [UsagePageComponent]
})
export class UsagePageModule {}
