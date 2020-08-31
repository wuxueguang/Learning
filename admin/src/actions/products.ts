import { Action, Dispatch } from "redux";

import { Behaviors, CONSTANTS } from "@/constants";
import { ProductTypes, RequestTypes } from "@/types";
import { Endpoint } from "@/endpoints";

export namespace ProductAction {
  export interface action extends Action<Behaviors.Products> {
    type: Behaviors.Products;
    products: ProductTypes.ProductInfo[];
    meta: ProductTypes.ProductMeta;
    productslib: ProductTypes.stockitem[];
    productslibpagi: RequestTypes.Pagination;
    privateStockItems: ProductTypes.stockitem[];
  }

  export async function get(id: string) {
    const res = await Endpoint.Product.getProducts(id);
    return {
      type: Behaviors.Products.get,
      products: res.relationships.product,
      meta: {
        catalog_type: res.catalog_type,
        preset_catalog_has_update: res.preset_catalog_has_update,
        preset_catalog_id: res.relationships.preset_catalog.id,
        status: res.status,
        name: res.relationships.preset_catalog.name,
        isPreset: res.catalog_type === CONSTANTS.CATALOG_TYPS.PRESET,
      }
    };
  }

  export function clean() {
    return {
      type: Behaviors.Products.clean
    };
  }
  export async function add(id: string) {
    // const res = await Endpoint.Zone.createZone(name,address);
    // return {
    //     type: Behaviors.Zones.add,
    //     zones: [res]
    // }
  }

  export async function del(id: string) {
    // const res = await Endpoint.Zone.updateZone(id,name,address);
    // return {
    //   type: Behaviors.Products.del
    // };
  }
  export async function getPrivateStockItems() {
    const res= await Endpoint.Product.getPrivateStockItems();
    return {
      type: Behaviors.Products.getPrivateStockItems,
      privateStockItems: res,
    };
  }

  export function beforeGetlib() {
    return {
      type: Behaviors.Products.beforeGetLib,
    }
  }

  export async function getlib(id: string, per: number, page: number, dispatch: Dispatch) {
    dispatch(beforeGetlib());
    const [res, pagi] = await Endpoint.Product.getProductsLibrary(
      id,
      per,
      page
    );
    return {
      type: Behaviors.Products.getlib,
      productslib: res,
      productslibpagi: pagi
    };
  }
  export function cleanlib() {
    return {
      type: Behaviors.Products.cleanlib
    };
  }
}
