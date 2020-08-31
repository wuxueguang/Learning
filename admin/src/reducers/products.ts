import { ProductAction } from "@/actions";
import { ProductTypes, RequestTypes } from "@/types";
import { Behaviors } from "@/constants";

export interface ProductsState {
  products?: ProductTypes.ProductInfo[];
  isFetching: boolean,
  meta: ProductTypes.ProductMeta;
  isLibFetching: boolean,
  productslib: ProductTypes.stockitem[];
  productslibpagi?: RequestTypes.Pagination;
  privateStockItems: ProductTypes.stockitem[];
}

const defaultProductsState: ProductsState = {
  meta: {
    status: "DRAFT",
    catalog_type: "customized",
    preset_catalog_has_update: false,
    name: '',
  },
  isFetching: true,
  isLibFetching: false,
  productslib: [],
  privateStockItems: [],
};

export default function(
  state: ProductsState = defaultProductsState,
  action: ProductAction.action
) {
  switch (action.type) {
    case Behaviors.Products.get:
      state.products = action.products.sort((a, b) => {
        return (a.sequence || 0) - (b.sequence || 0);
      });
      state.meta = action.meta;
      state.isFetching = false;
      return Object.assign({}, state);
    case Behaviors.Products.clean:
      state.products = [];
      return Object.assign({}, state);
    case Behaviors.Products.add:
    case Behaviors.Products.del:
    case Behaviors.Products.getlib:
      state.productslib = state.productslib.concat(action.productslib);
      state.productslibpagi = action.productslibpagi;
      state.isLibFetching = false;
      return Object.assign({}, state);
    case Behaviors.Products.beforeGetLib:
        state.isLibFetching = true;
      return Object.assign({}, state);
    case Behaviors.Products.cleanlib:
      state.productslib = [];
      state.productslibpagi = {
        current_page: 1,
        total_page: 1,
        total_count: 0,
        size: 0
      };
      return Object.assign({}, state);
    case Behaviors.Products.getPrivateStockItems:
      state.privateStockItems = action.privateStockItems;
      return Object.assign({}, state);
    default:
      return state;
  }
}
