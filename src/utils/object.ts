import { ParsedQuery } from 'query-string';

export function equalObjectKey(obj1: Object, obj2: Object): boolean {
  const obj1Keys: string[] = Object.keys(obj1);
  const obj2Keys: string[] = Object.keys(obj2);
  const obj1KeysLen: number = obj1Keys.length;
  if (obj1KeysLen !== obj2Keys.length) {
    return false;
  }
  let is = true;
  for (let index = 0; index < obj1KeysLen; index++) {
    const element: string = obj1Keys[index];
    if (!Object.prototype.hasOwnProperty.call(obj2, element)) {
      is = false;
      break;
    }
  }
  return is;
}

export function equalObject(obj1: ParsedQuery, obj2: ParsedQuery): boolean {
  const obj1Keys: string[] = Object.keys(obj1);
  const obj2Keys: string[] = Object.keys(obj2);
  const obj1KeysLen: number = obj1Keys.length;
  const obj2KeysLen: number = obj2Keys.length;
  if (obj1KeysLen !== obj2KeysLen) {
    return false;
  }

  if (obj1KeysLen === 0 && obj2KeysLen === 0) {
    return true;
  }

  return !obj1Keys.some((key) => obj1[key] !== obj2[key]);
}
