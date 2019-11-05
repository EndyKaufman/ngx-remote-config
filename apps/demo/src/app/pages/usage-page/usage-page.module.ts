import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { DocsExampleModule } from '../../components/docs-example/docs-example.module';
import { SourceTabsModule } from '../../components/source-tabs/source-tabs.module';
import { SharedModule } from '../../shared/shared.module';
import { UsagePageComponent } from './usage-page.component';
import { UsagePageRoutes } from './usage-page.routes';
import { UseDirectiveModule } from './use-directive/use-directive.module';
import { UseMockRestModule } from './use-mock-rest/use-mock-rest.module';
import { UseRestModule } from './use-rest/use-rest.module';
import { UseServiceModule } from './use-service/use-service.module';
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(UsagePageRoutes),
    MarkdownModule.forRoot(),
    DocsExampleModule.forRoot(),
    SourceTabsModule,
    FlexLayoutModule,
    UseServiceModule,
    UseDirectiveModule,
    UseMockRestModule,
    UseRestModule
  ],
  declarations: [UsagePageComponent]
})
export class UsagePageModule {}
