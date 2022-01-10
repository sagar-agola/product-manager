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

  CheckHasDuplicateElement(data: any[], property: string): boolean {
    let hasDuplicate: boolean = false;

    data.forEach(item => {
      if (hasDuplicate == false) {
        hasDuplicate = data.some(value => value[property] == item[property]);
      }
    });

    return hasDuplicate;
  }
}
