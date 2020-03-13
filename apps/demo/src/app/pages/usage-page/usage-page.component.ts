import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'usage-page',
  templateUrl: './usage-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsagePageComponent {
  sources = {
    directive: {
      html: require('!!raw-loader!./use-directive/use-directive.component.html').default,
      ts: require('!!raw-loader!./use-directive/use-directive.component.ts').default
    },
    service: {
      html: require('!!raw-loader!./use-service/use-service.component.html').default,
      ts: require('!!raw-loader!./use-service/use-service.component.ts').default
    },
    mockRest: {
      html: require('!!raw-loader!./use-mock-rest/use-mock-rest.component.html').default,
      ts: require('!!raw-loader!./use-mock-rest/use-mock-rest.component.ts').default
    },
    realRest: {
      html: require('!!raw-loader!./use-rest/use-rest.component.html').default,
      ts: require('!!raw-loader!./use-rest/use-rest.component.ts').default
    }
  };
}
