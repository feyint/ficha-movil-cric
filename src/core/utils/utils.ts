import {QuestionCodes} from './HousingTypes';

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function propNameQuestion(value: any): any {
  let prop: any = QuestionCodes;
  let propNameValue = '';
  for (var i in prop) {
    if (typeof prop[i] === 'object') {
      let propNameV = propNameQuestion(value);
      if (propNameV) {
        return propNameValue;
      }
    } else {
      if (prop[i] == value) {
        propNameValue = i;
        return propNameValue;
      }
    }
  }
  return undefined;
}
