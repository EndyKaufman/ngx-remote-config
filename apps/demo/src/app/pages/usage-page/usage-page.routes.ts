import { Routes } from '@angular/router';
import { UsagePageComponent } from './usage-page.component';

export const UsagePageRoutes: Routes = [
  {
    path: '',
    component: UsagePageComponent,
    data: {
      name: 'usage',
      title: 'Usage',
      visible: true,
      svgIcon: 'cloud_circle'
    },
    children: []
  }
];
