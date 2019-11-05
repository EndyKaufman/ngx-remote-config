import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'usage-page',
  templateUrl: './usage-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsagePageComponent {
  sources = {
    directive: {
      html: require('!!raw-loader?lang=html!./use-directive/use-directive.component.html'),
      ts: require('!!raw-loader?lang=typescript!./use-directive/use-directive.component.ts')
    },
    service: {
      html: require('!!raw-loader?lang=html!./use-service/use-service.component.html'),
      ts: require('!!raw-loader?lang=typescript!./use-service/use-service.component.ts')
    },
    mockRest: {
      html: require('!!raw-loader?lang=html!./use-mock-rest/use-mock-rest.component.html'),
      ts: require('!!raw-loader?lang=typescript!./use-mock-rest/use-mock-rest.component.ts')
    },
    realRest: {
      html: require('!!raw-loader?lang=html!./use-rest/use-rest.component.html'),
      ts: require('!!raw-loader?lang=typescript!./use-rest/use-rest.component.ts')
    }
  };
}
