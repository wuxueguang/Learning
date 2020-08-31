import { fetch } from "@/utils";
import { BusinessTypes } from "@/types";

export default {

  async getBusiness(): Promise< BusinessTypes.BusinessInfo> {
    const res = await fetch<BusinessTypes.BusinessInfo>('/offline/biz/business');
    if (res.data) return res.data;
    throw new Error("get business fail");
  }

};
