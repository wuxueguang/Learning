import { Action } from "redux";
import { Behaviors } from "@/constants";
import { CatalogTypes, RequestTypes } from "@/types";
import { Endpoint } from "@/endpoints";

export namespace CatalogAction {
  export interface action extends Action<Behaviors.Catalog> {
    type: Behaviors.Catalog;
    presetCatalog: CatalogTypes.CatalogInfo[];
    presetCatalogPagi: RequestTypes.Pagination;
  }
  export async function getPresetCatalog(page: number) {
    const res = await Endpoint.Catalog.getPresetCatalog(page);
    return {
      type: Behaviors.Catalog.getPresetCatalog,
      presetCatalog: res.data,
      presetCatalogPagi: res.pagination,
    };
  }
}
