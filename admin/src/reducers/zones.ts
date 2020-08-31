import { ZoneAction } from "@/actions";
import { ZoneTypes, RequestTypes } from "@/types";
import { Behaviors } from "@/constants";
import { replaceKeyFromTargetArr } from "@/utils/arrcommon";

export interface ZonesState {
  zones: ZoneTypes.ZoneInfo[];
  zoneMenus: ZoneTypes.zoneMenu[];
  pagination: RequestTypes.Pagination;
  zone?: ZoneTypes.ZoneInfo;
  fetching: boolean;
}

const defaultZonesState: ZonesState = { 
  zones: [],
  zoneMenus: [],
  fetching: true,
  pagination: {
    current_page: 1,
    total_page: 1,
    total_count: 1,
    size: 1,
  }
};

function getMenu(src) {
  if (src.length === 0) {
    return [];
  }
  let tmp: ZoneTypes.zoneMenu[] = [];
  src.forEach(e => {
    tmp.push({
      target: "zone",
      name: e.name,
      flag: e.id,
      param: {
        id: e.id
      }
    });
  });
  return tmp;
}
export default function(
  state: ZonesState = defaultZonesState,
  action: ZoneAction.action
) {
  switch (action.type) {
    case Behaviors.Zones.startFetch:
      state.zones = [];
      state.fetching = true;
      state.zoneMenus = [];
      state.pagination = Object.assign({}, action.pagination);
      return Object.assign({}, state);
    case Behaviors.Zones.get:
      state.zones = Object.assign([], state.zones.concat(action.zones));
      state.fetching = false;
      state.zoneMenus = Object.assign(
        [],
        state.zoneMenus.concat(getMenu(action.zones))
      );
      state.pagination = Object.assign({}, action.pagination);
      return Object.assign({}, state);
    case Behaviors.Zones.add:
      if (state.zones.length > 0) {
        state.zones = Object.assign([], state.zones.concat(action.zones));
        state.zoneMenus = Object.assign(
          [],
          state.zoneMenus.concat(getMenu(action.zones))
        );
      } else {
        state.zones = Object.assign([], action.zones);
        state.zoneMenus = Object.assign([], getMenu(state.zones));
      }
      return Object.assign({}, state);
    case Behaviors.Zones.update:
      state.zones = Object.assign(
        [],
        replaceKeyFromTargetArr(
          { id: action.zones[0].id },
          state.zones,
          action.zones[0]
        )
      );
      let menu = getMenu(action.zones);
      state.zoneMenus = Object.assign(
        [],
        replaceKeyFromTargetArr(
          { flag: action.zones[0].id },
          state.zoneMenus,
          menu[0]
        )
      );
      return Object.assign({}, state);
    case Behaviors.Zones.replace:
      state.zones = Object.assign([], action.zones);
      state.zoneMenus = Object.assign([], getMenu(action.zones));
      return Object.assign({}, state);
    case Behaviors.Zones.clean:
      state.zones = [];
      state.zoneMenus = [];
      return Object.assign({}, state);
    case Behaviors.Zones.getzone:
      state.zone = action.zone;
      return Object.assign({}, state);
    case Behaviors.Zones.getCatalogs:
      if (state.zone) {
        state.zone.catalogs = action.catalogs;
      }
      return state;
    default:
      return state;
  }
}
