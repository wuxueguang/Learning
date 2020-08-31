import { CatalogAction } from "@/actions";
import { CatalogTypes, RequestTypes } from "@/types";
import { Behaviors } from "@/constants";

export interface CatalogState {
  presetCatalog: CatalogTypes.CatalogInfo[];
  presetCatalogPagi: RequestTypes.Pagination;
  isFetching: boolean;
}

const defaultCatalogState: CatalogState = {
  presetCatalog: [],
  presetCatalogPagi: {
    current_page: 1,
    total_page: 2,
    total_count: 1,
    size: 1,
  },
  isFetching: false,
};

export default function(
  state: CatalogState = defaultCatalogState,
  action: CatalogAction.action
) {
  switch (action.type) {
    case Behaviors.Catalog.startGetPresetCatalog:
      state.isFetching = true;
      return Object.assign({}, state);
    case Behaviors.Catalog.getPresetCatalog:
      if(state.presetCatalogPagi.current_page >= state.presetCatalogPagi.total_page) {
        return state;
      }
      state.presetCatalog = state.presetCatalog.concat(action.presetCatalog);
      state.presetCatalogPagi = action.presetCatalogPagi;
      state.isFetching = false;
      return Object.assign({}, state);
    default:
      return state;
  }
}
