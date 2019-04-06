import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { CustomJsonPipe } from './pipes/custom-json.pipe';

@NgModule({
  imports: [CommonModule],
  providers: [],
  declarations: [SafeHtmlPipe, CustomJsonPipe],
  exports: [CommonModule, SafeHtmlPipe, CustomJsonPipe]
})
export class SharedModule {}
