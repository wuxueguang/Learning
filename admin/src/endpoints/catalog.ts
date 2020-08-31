import { fetch } from "@/utils";

export default {
  async getPresetCatalog(page = 1): Promise<any> {
    const res = await fetch(
      `/offline/biz/preset_catalogs?page=${page}&per=10&sort=-updated_at`
    );
    if (res.data) return res;
    throw new Error("get devices fail");
  },

  async getAudienceCatalos(zoneId: string, page = 1, per = 10): Promise<any> {
    const res = await fetch(
      `/offline/audience/products?zone_id=${zoneId}&page=${page}&per=${per}`
    );
    if (res.data) return res;
    throw new Error("get products fail");
  }
};
