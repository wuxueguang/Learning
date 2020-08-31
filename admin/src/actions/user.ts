import { Action } from "redux";
import { Behaviors } from "@/constants";
import { UserTypes } from "@/types";
import { Endpoint } from "@/endpoints";

export namespace UserAction {
  export interface action extends Action<Behaviors.User> {
    type: Behaviors.User;
    token?: string;
    user?: UserTypes.UserBasicInfo;
    policy?: UserTypes.PolicyInfo[];
    permission?: number[]
  }

  export async function login(username: string, password: string) {
    const res = await Endpoint.User.login(username, password);
    return {
      type: Behaviors.User.login,
      token: res.data!.access_token,
      user: { username: username, uid: res.data && res.data.user.uid }
    };
  }

  export function logout(): action {
    return {
      type: Behaviors.User.logout
    };
  }

  export async function getPolicy(uid) {
    const result = await Endpoint.User.getPolicy(uid);
    return {
      type: Behaviors.User.getPolicy,
      policy: result.data || []
    }
  }

  export async function getPermission() {
    const res = await Endpoint.User.getPermission();
    return {
      type: Behaviors.User.getPermission,
      permission: res.data,
    };
  }

}
