import { INgxRemoteConfig } from './ngx-remote-config.interface';

export const DEFAULT_NGX_REMOTE_CONFIG: INgxRemoteConfig = {
  url: undefined,
  withoutIterceptor: false,
  notLockAppInitialize: false,
  debug: false,
  debugMatchUrl: false,
};
export const NGX_REMOTE_CONFIG = 'NgxRemoteConfig';
