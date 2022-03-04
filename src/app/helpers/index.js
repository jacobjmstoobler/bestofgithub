import queryString from "qs";

export const objToUrlParams = obj => {
    return queryString.stringify(cleanObject(obj));
  };
export function cleanObject(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  }