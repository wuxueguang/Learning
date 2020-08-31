import { fetch } from "@/utils";
import { OrderTypes } from "@/types";

export default {
  async getOrder(
    id: string,
    start: string,
    end: string
  ): Promise<OrderTypes.statis> {
    const res = await fetch<any>(
      `/offline/biz/zones/${id}/orders?start=${start}&end=${end}`
    );
    if (res.data) return res.data;
    throw new Error("unable get order");
  }
};
