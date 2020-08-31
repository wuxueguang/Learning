import { fetch } from "@/utils";
import { ZoneTypes, RequestTypes } from "@/types";

type StatusCheck = {
  is_ready: boolean;
  need_download_stock_items?: string[];
};

export default {
  async getZones(
    per: number = 10,
    page: number = 1
  ): Promise<[ZoneTypes.ZoneInfo[], RequestTypes.Pagination]> {
    const res = await fetch<ZoneTypes.ZoneInfo[]>(
      `/offline/biz/zones?per=${per}&page=${page}&sort=-created_at`
    );
    if (res.data) return [res.data, res.pagination!];
    throw new Error("unable fetch zones");
  },
  async createZone(name: string, address: string): Promise<ZoneTypes.ZoneInfo> {
    const res = await fetch<ZoneTypes.ZoneInfo>("/offline/biz/zones", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        address: address
      })
    });
    if (res.data) return res.data;
    throw new Error("unable create zone");
  },
  async getZone(id: string): Promise<ZoneTypes.ZoneInfo> {
    let res = await fetch<ZoneTypes.ZoneInfo>(`/offline/biz/zones/${id}`);
    if (res.data) return res.data;
    throw new Error("get zone fail");
  },
  async updateZone(
    id: string,
    name: string,
    address: string
  ): Promise<ZoneTypes.ZoneInfo> {
    const res = await fetch<ZoneTypes.ZoneInfo>(`/offline/biz/zones/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        address: address
      })
    });
    if (res.data) return res.data;
    throw new Error("update zone fail");
  },
  async zoneQrcode(id: string): Promise<any> {
    const res = await fetch<any>(`/offline/biz/zones/${id}/qr_code`);
    if (res.data) return res.data;
    throw new Error("generate qrcode fail");
  },
  async zoneRechargeQrcode(id: string): Promise<any> {
    const res = await fetch<any>(`/offline/biz/zones/${id}/recharge_qr_code`);
    if (res.data) return res.data;
    throw new Error("generate qrcode fail");
  },
  async getPreview(id: string): Promise<any> {
    const res = await fetch<any>(`/contents/${id}`);
    if (res.data) return res.data;
    throw new Error("get preview video fail");
  },
  async canDeviceUpdate(id: string): Promise<boolean> {
    let res = await fetch<ZoneTypes.ZoneInfo>(`/offline/biz/zones/${id}`);
    if (res.data) {
      return true;
    }
    return false;
  },
  async getZoneInfo(zoneId: string): Promise<any> {
    let res = await fetch(`/offline/audience/zones/${zoneId}`);
    if (res.data) {
      return res.data;
    }
    throw new Error("get zoneInfo fail");
  },
  async getCatalogs(zoneId: string): Promise<any> {
    let res = await fetch(`/offline/biz/v2/zones/${zoneId}/catalogs`);
    if (res.data) {
      return res.data;
    }
    throw new Error("get getCatalogs fail");
  },
  async removeCatalog(zoneId: string, catalog_id: string): Promise<any> {
    const res = await fetch(`/offline/biz/v2/zones/${zoneId}/catalogs`, {
      method: 'DELETE',
      body: JSON.stringify({
        catalog_id,
      }),
    });
    if (res.message === 'ok') {
      return res.message;
    }
    throw new Error("get getCatalogs fail");
  },
  async checkCatalogRelease (zoneId: string, stockItems): Promise<StatusCheck> {
    const res = await fetch<StatusCheck>(`/offline/biz/v2/zones/${zoneId}/catalogs/publish_release_check`, {
      method: 'POST',
      body: JSON.stringify({
        stock_items: stockItems
      }),
    });
    if (res.data) {
      return res.data;
    }
    throw new Error("get getCatalogs fail");
  },

  async createCatalog (zoneId: string, release_at:string, stockItems): Promise<ZoneTypes.CatalogInfo> {
    const res = await fetch<ZoneTypes.CatalogInfo>(`/offline/biz/v2/zones/${zoneId}/catalogs`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'customized',
        release_at,
        products: stockItems
      }),
    });
    if (res.data) {
      return res.data;
    }
    throw new Error("createCatalog fail");
  },

  async publishCatalog (zoneId: string, catalog_id: string): Promise<any> {
    const res = await fetch<StatusCheck>(`/offline/biz/v2/zones/${zoneId}/catalogs/publish`, {
      method: 'PUT',
      body: JSON.stringify({
        catalog_id,
      }),
    });
    if (res.message) {
      return res.message;
    }
    throw new Error("发布失败");
  },

  async releaseCatalog (zoneId: string): Promise<any> {
    const res = await fetch(`/offline/biz/v2/zones/${zoneId}/catalogs/release`, {
      method: 'POST',
    });
    if (res.message) {
      return res.message;
    }
    throw new Error("get getCatalogs fail");
  },

  async updateZoneAssets (zoneId: string): Promise<any> {
    const res = await fetch(`/offline/biz/v2/zones/${zoneId}/zone_assets/publish`, {
      method: 'POST',
    });
    if (res.message) {
      return res.message;
    }
    throw new Error("createCatalog fail");
  },

  async getDownloadStat(zoneId: string): Promise<any> {
    let res = await fetch(`/offline/biz/v2/zones/${zoneId}/catalogs/download_stats`);
    if (res.data) {
      return res.data;
    }
    throw new Error("get getDownloadStat fail");
  },

  async updatePrice (zoneId: string, productId: string, price: number): Promise<any> {
    const res = await fetch(`/offline/biz/v2/zones/${zoneId}/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({
        price: Number(price)
      }),
    });
    if (res.data) {
      return res.data;
    }
    throw new Error("createCatalog fail");
  },
};
