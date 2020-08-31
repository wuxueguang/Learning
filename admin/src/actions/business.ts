import { Action } from "redux";
import { Behaviors } from "@/constants";
import { UserTypes, BusinessTypes } from "@/types";
import { Endpoint } from "@/endpoints";

export namespace BusinessAction {
  export interface action extends Action<Behaviors.Business> {
    business: BusinessTypes.BusinessInfo;
    featureFlags: [];
  }

  export async function get () {
    const result = await Endpoint.Business.getBusiness();
    return {
      type: Behaviors.Business.get,
      business: result,
      featureFlags: result.relationships.feature_flags || []
    };
  }
}
