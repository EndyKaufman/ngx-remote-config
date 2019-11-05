export interface INgxRemoteConfig {
  url?: string;
  default?: any;
  withoutIterceptor?: boolean;
  withoutAppInitialize?: boolean;
  notLockAppInitialize?: boolean;
  debug?: boolean;
  debugMatchUrl?: boolean;
}
