// import { duration } from "moment";

export namespace ProductTypes {
  export interface ProductMeta {
    catalog_type: string;
    isPreset?: boolean;
    preset_catalog_id?: string;
    preset_catalog_has_update: boolean;
    name: string;
    status: string;
  }

  export interface ProductInfo {
    id?: string;
    _id?: string;
    type: "product";
    name: string;
    description?: string;
    tagline?: string;
    thumbnail: string;
    duration: number;
    sequence?: number;
    min_price?: string;
    dubbing?: string; //配音
    /**
     * price is string!!!!!
     *
     * @type {string}
     * @memberof ProductInfo
     */
    price: string;
    current_price?: string;
    currency: "CNY";
    tags?: string[];
    zone_id?: string;
    default_sales_price?: string;
    relationships: {
      stock_item: stockitem;
      tags?: any[];
    };
    isPrivate?: boolean;
    isEdit?: boolean;
  }
  export interface ProductCatalog {
    type: "catalog";
    status: string;
    id: string;
    catalog_type: string;
    preset_catalog_id?: string;
    preset_catalog_has_update: boolean;
    relationships: {
      product: ProductInfo[];
      preset_catalog: presetCatalog,
    };
  }
  export interface presetCatalog {
    description: string;
    id: string;
    name: string;
    type: string;
    preset_catalog_id: string;
    updated_at: number;
  }
  export interface stockitem {
    author: string;
    banner?: string;
    add?: boolean; //是否已加入片单
    content_safe_id: string;
    currency: "CNY";
    description: string;
    duration?: number;
    id: string;
    // 模拟 id
    _id?: string;
    min_price: string;
    price: string;
    name: string;
    category: any;
    preview_path?: string;
    relationships?: {
      tags: tags[];
    };
    tagline: string;
    thumbnail: string;
    default_sales_price: string;
  }
  export interface tags {
    id: string;
    name: string;
    type: "tag";
  }
  export interface preview {
    title?: string;
    img: string;
    id: string;
  }
}
