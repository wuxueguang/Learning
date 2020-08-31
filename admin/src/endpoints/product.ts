import { fetch } from "@/utils";
import { ProductTypes, RequestTypes } from "@/types";

export default {
  async createProductCatalog(
    id: string,
    products: any[],
    catalogId: string,
    type: string
  ): Promise<ProductTypes.ProductCatalog> {
    const body = {
      products,
      type,
      preset_catalog_id: (type === 'preset' && catalogId)
    };
    const res = await fetch<ProductTypes.ProductCatalog>(
      `/offline/biz/zones/${id}/catalogs`,
      {
        method: "POST",
        body: JSON.stringify(body)
      }
    );
    if (res.data) return res.data;
    throw new Error("create product catalog fail");
  },
  async createCustomizedProductCatalog(
    id: string,
    products: any[]
  ): Promise<ProductTypes.ProductCatalog> {
    const body = {
      products,
      type: 'customized',
    };
    const res = await fetch<ProductTypes.ProductCatalog>(
      `/offline/biz/zones/${id}/catalogs`,
      {
        method: "POST",
        body: JSON.stringify(body)
      }
    );
    if (res.data) return res.data;
    throw new Error("create product catalog fail");
  },
  async publishProductCatalog(id: string): Promise<void> {
    const res = await fetch<void>(`/offline/biz/zones/${id}/catalogs/publish`, {
      method: "PUT"
    });
    if (res) return;
    throw new Error(" publish product catalog fail");
  },
  async getProducts(id: string): Promise<ProductTypes.ProductCatalog> {
    const res = await fetch<ProductTypes.ProductCatalog>(
      `/offline/biz/zones/${id}/catalogs`
    );
    if (res.data) return res.data;
    throw new Error("get products fail");
  },
  async getProductDetail(id: string): Promise<ProductTypes.ProductInfo> {
    const res = await fetch<ProductTypes.ProductInfo>(
      `/offline/biz/products/${id}`
    );
    if (res.data) return res.data;
    throw new Error(`get product ${id} fail`);
  },
  async getProductsLibrary(
    id: string,
    per: number,
    page: number
  ): Promise<[ProductTypes.stockitem[], RequestTypes.Pagination]> {
    const res = await fetch<ProductTypes.stockitem[]>(
      `/offline/biz/stock_items?per=${per}&page=${page}`
    );
    if (res.data) return [res.data, res.pagination!];
    throw new Error("get products library fail");
  },
  async getPrivateStockItems(): Promise<ProductTypes.stockitem[]> {
    const res = await fetch<ProductTypes.stockitem[]>('/offline/biz/private_stock_items?per=1000');
    if (res.data) return res.data;
    throw new Error("get products library fail");
  },
  async getCatalogProduct(zoneId, status): Promise<ProductTypes.ProductInfo[]> {
    let url = `/offline/biz/v2/zones/${zoneId}/products`;
    if (status) {
      url += '?release_status=' + status;
    }
    const res = await fetch<ProductTypes.ProductInfo[]>(url);
    if (res.data) return res.data;
    throw new Error("get products library fail");
  },
  async getPublishActiveCatalog(zoneId): Promise<ProductTypes.ProductCatalog> {
    let url = `/offline/biz/v2/zones/${zoneId}/catalogs`;
  
    const res = await fetch<ProductTypes.ProductCatalog>(url);
    if (res.data) return res.data;
    throw new Error("get products library fail");
  }
};
