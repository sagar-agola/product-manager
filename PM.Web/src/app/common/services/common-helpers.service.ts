import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonHelpersService {

  constructor() { }

  ToPascaleCase(input: string): string {
    if (!input) {
      return "";
    }

    if (input.length == 1) {
      return input.toUpperCase();
    }
    else {
      return `${input[0].toUpperCase()}${input.substring(1)}`;
    }
  }
}
