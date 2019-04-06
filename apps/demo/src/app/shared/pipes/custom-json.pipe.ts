import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customJson'
})
export class CustomJsonPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return JSON.stringify(value, null, 4);
  }
}
