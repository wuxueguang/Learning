import { combineReducers } from "redux";
import user from "./user";
import business from './business';
import zones from "./zones";
import products from "./products";
import menu from "./menu";
import preview from "./preview";
import catalog from "./catalog";

export default combineReducers({
  User: user,
  Business: business,
  Zones: zones,
  Products: products,
  Menu: menu,
  Preview: preview,
  Catalog: catalog,
});

// export default function createReducer(asyncReducers?) {
//   console.log('---------')
//   return combineReducers({
//     User: user,
//     Zones: zones,
//     ...asyncReducers
//   });
// }
