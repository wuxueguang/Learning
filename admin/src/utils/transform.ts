import moment from "moment";

export function nameToSymbol(name: string) :string {
  let symbolStr = '¥';
  if (name === 'USD') {
    symbolStr = '$';
  }

  return symbolStr;
}

export function fastClone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export function secondsToDate(seconds:number): string {
  return moment.unix(seconds).format('YYYY-MM-DD');
}
