import { BusinessAction } from "@/actions";
import { BusinessTypes } from "@/types";
import { Behaviors } from "@/constants";
import business from "@/endpoints/business";

export interface BusinessState {
  featureFlags: BusinessTypes.FeatureFlagInfo[];
  id: string;
  name: string;
  phone: string;
}

const defaultBusinessState: BusinessState = {
  featureFlags: [],
  id: '',
  name: '',
  phone: ''
};

export default function(
  state: BusinessState = defaultBusinessState,
  action: BusinessAction.action
) {
  switch (action.type) {
    case Behaviors.Business.get:
      state.featureFlags = action.featureFlags
      state.phone = action.business.phone;
      state.id = action.business.id;
      state.name = action.business.name;
      return state;
    default:
      return state;
  }
}
