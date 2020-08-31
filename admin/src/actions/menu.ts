import { Action } from "redux";
import { Behaviors } from "@/constants";
import { MenuTypes } from "@/types";
import store from "@/store_old";
import { checkFeatureFlag } from '@/components/withFeatureFlag';
import { checkUserPolicy } from '@/components/withUserPolicy';
// import { Endpoint } from "@/endpoints";

export namespace MenuAction {
  export interface action extends Action<Behaviors.Menu> {
    type: Behaviors.Menu;
    select: MenuTypes.select;
    menuitem: MenuTypes.MenusItem;
  }
  export function change(select: MenuTypes.select) {
    return {
      type: Behaviors.Menu.change,
      select: select
    };
  }
  export function get() {
    // const cooperatorsResult = await Endpoint.Megane.getCooperators(businessId);
    let st = store.getState();
    const tmp = [
      {
        name: "体验区管理",
        children: st.Zones.zoneMenus,
        target: "/",
        flag: "zone",
        type: "shop"
      },
      {

        name: "合作方分成",
        target: "shared",
        flag: "partnerIncomeSummary",
        policyCode: 'megane_receiver_cooperators_income_summaries',
        type: "calculator"
      },
      {
        name: "商家管理",
        target: "settings",
        flag: "setting",
        type: "setting"
      }
    ];
    const menu = tmp.filter((item) => {
      return checkUserPolicy(item.policyCode) && checkFeatureFlag(item.flag);
    });
    return {
      type: Behaviors.Menu.get,
      menuitem: menu
    };
  }
}
