export namespace MiscTypes {
  export interface MenusItem {
    name: string;
    target: string;
    group?: boolean;
    flag?: string;
    type?: string;
    param?: { [key: string]: any };
    children?: MenusItem[];
  }
}
