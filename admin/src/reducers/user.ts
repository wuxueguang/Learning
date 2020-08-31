import { UserAction } from "@/actions";
import { UserTypes } from "@/types";
import { Behaviors } from "@/constants";
import { List } from "antd";

export interface UserState {
  token?: string;
  user?: UserTypes.UserBasicInfo;
  policy?: UserTypes.PolicyInfo[];
  permission?: number[]
}

const defaultUserState: UserState = {};

export default function(
  state: UserState = defaultUserState,
  action: UserAction.action
) {
  switch (action.type) {
    case Behaviors.User.login:
      state.token = action.token;
      state.user = action.user;
      return state;
    case Behaviors.User.logout:
      state.token = undefined;
      state.user = undefined;
      return state;
    case Behaviors.User.getPolicy:
      state.policy = action.policy;
      return state;
    case Behaviors.User.getPermission:
      state.permission = action.permission;
      return state;
    default:
      if (localStorage.getItem("VEER_OFFLINE_AUTO_LOGIN_TOKEN")) {
        state.token = localStorage.getItem("VEER_OFFLINE_AUTO_LOGIN_TOKEN") || "";
        if (localStorage.getItem("VEER_OFFLINE_PERMISSION")) {
          state.permission = JSON.parse(
            localStorage.getItem("VEER_OFFLINE_PERMISSION") || ""
          );
        }
        if (localStorage.getItem("VEER_OFFLINE_AUTO_LOGIN_USERINFO")) {
          state.user = JSON.parse(
            localStorage.getItem("VEER_OFFLINE_AUTO_LOGIN_USERINFO") || ""
          );
        }
        return state;
      }
      if (sessionStorage.getItem("VEER_OFFLINE_AUTO_LOGIN_TOKEN")) {
        state.token = sessionStorage.getItem("VEER_OFFLINE_AUTO_LOGIN_TOKEN") || "";
        if (sessionStorage.getItem("VEER_OFFLINE_PERMISSION")) {
          state.permission = JSON.parse(
            sessionStorage.getItem("VEER_OFFLINE_PERMISSION") || ""
          );
        }
        if (sessionStorage.getItem("VEER_OFFLINE_AUTO_LOGIN_USERINFO")) {
          state.user = JSON.parse(
            sessionStorage.getItem("VEER_OFFLINE_AUTO_LOGIN_USERINFO") || ""
          );
        }
      }
      return state;
  }
}
