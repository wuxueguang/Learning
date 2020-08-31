import { string } from "prop-types";

export namespace MenuTypes {
  export type select = string;
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
