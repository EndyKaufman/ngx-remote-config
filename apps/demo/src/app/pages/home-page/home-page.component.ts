import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readme = require('!!raw-loader!../../../../../../README.md').default.replace('# ngx-remote-config', '');

  source = {
    html: require('!!raw-loader!./home-page.component.html.txt').default,
    ts: require('!!raw-loader!./home-page.component.ts.txt').default,
  };
}
