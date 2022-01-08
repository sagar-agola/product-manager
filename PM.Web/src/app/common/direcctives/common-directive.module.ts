import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitTextToDirective } from './limit-text-to.directive';

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
