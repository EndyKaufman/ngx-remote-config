import { Routes } from '@angular/router';
import { HomePageRoutes } from './pages/home-page/home-page.routes';
import { UsagePageRoutes } from './pages/usage-page/usage-page.routes';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './pages/home-page/home-page.module#HomePageModule',
    data: HomePageRoutes[0].data,
  },
  {
    path: 'usage',
    loadChildren: './pages/usage-page/usage-page.module#UsagePageModule',
    data: UsagePageRoutes[0].data,
  },
  {
    path: 'github',
    redirectTo: 'https://github.com/EndyKaufman/ngx-remote-config',
    data: {
      name: 'github',
      title: 'github',
      svgIcon: `github-circle`,
      visible: true,
    },
  } /*,
  {
    path: '**',
    redirectTo: 'home'
  }*/,
];
