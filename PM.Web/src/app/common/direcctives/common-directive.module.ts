import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitTextToDirective } from './max-length.directive';

@NgModule({
  declarations: [
    LimitTextToDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LimitTextToDirective
  ]
})
export class CommonDirectiveModule { }
