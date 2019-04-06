[![Greenkeeper badge](https://badges.greenkeeper.io/EndyKaufman/ngx-remote-config.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/EndyKaufman/ngx-remote-config.svg?branch=master)](https://travis-ci.org/EndyKaufman/ngx-remote-config)
[![npm version](https://badge.fury.io/js/ngx-remote-config.svg)](https://badge.fury.io/js/ngx-remote-config)


Remote configurations for Angular applications, with built-in interceptor for mock REST data and non-permanent api

## Installation

```bash
npm i --save ngx-remote-config
```

## Links

[Demo](https://endykaufman.github.io/ngx-remote-config) - Demo application with ngx-remote-config.

[Stackblitz](https://stackblitz.com/edit/ngx-remote-config) - Simply sample of usage on https://stackblitz.com

[Demo settings](https://testapi.io/api/EndyKaufman/ngx-remote-config.json) - Settings for demo application stored on https://testapi.io

[path-to-regexp](https://github.com/pillarjs/path-to-regexp) - Library usage for match url on interceptor


# Usage

app.module.ts
```js 
import { NgxRemoteConfigModule } from 'ngx-remote-config';

@NgModule({
  imports: [
    ...
    NgxRemoteConfigModule.forRoot({
      url: 'https://testapi.io/api/EndyKaufman/ngx-remote-config.json'
    }),
    ...
  ],
  ...
})
export class AppModule {}
```

app.component.ts
```html
...
<ng-container *remoteConfig="let config">
  {{config|json}}
</ng-container>
...
```

settings.json (https://testapi.io/api/EndyKaufman/ngx-remote-config.json)
```json
{
  "options":{
    "name":"Remote name",
    "description":"Remote description"
  },
  "/api/resource/2": {
    "get": {
      "status": 404,
      "body": {
        "message": "Fake not found message"
      }
    }
  },
  "/api/resource": {
    "get": [
      {
        "name": "get:item1"
      },
      {
        "name": "get:item2"
      },
      {
        "name": "get:item3"
      }
    ]
  },
  "/api/(.*)": "https://todo-nestjs.rucken.io/api/"
}
```

## License

MIT
