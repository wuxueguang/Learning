import { MenuAction } from "@/actions";
import { ZonesState } from "@/reducers/zones";
import { MenuTypes } from "@/types";
import { Behaviors } from "@/constants";

export interface MenuState {
  select?: MenuTypes.select;
  Menuitem: MenuTypes.MenusItem[];
}

const defaultMenuState: MenuState = {
  Menuitem: [
    {
      name: "体验区管理",
      children: [],
      target: "/",
      flag: "zone",
      type: "shop"
    },
    {
      name: "商家管理",
      target: "settings",
      flag: "setting",
      type: "setting"
    }
  ]
};

export default function(
  state: MenuState = defaultMenuState,
  action: MenuAction.action
) {
  switch (action.type) {
    case Behaviors.Menu.change:
      state.select = action.select;
      return Object.assign({}, state);
    case Behaviors.Menu.get:
      state.Menuitem = Object.assign([], action.menuitem);
      return Object.assign({}, state);
    default:
      return state;
  }
}
