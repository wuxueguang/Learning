import { string } from "prop-types";

export namespace OrderTypes {
  export interface statis {
    id: string;
    type: "zone";
    name: string;
    address: string;
    consumers_count: number;
    tickets_count: number;
    orders_count: number;
    total_income: string;
    total_cash_income: string;
  }
}
