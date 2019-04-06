import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  readme = require('!!raw-loader?lang=markdown!../../../../../../README.md').replace('# ngx-remote-config', '');

  source = {
    html: require('!!raw-loader?lang=html!./home-page.component.html.txt'),
    ts: require('!!raw-loader?lang=typescript!./home-page.component.ts.txt')
  };
}
