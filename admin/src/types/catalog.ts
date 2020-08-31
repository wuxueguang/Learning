import { ProductTypes } from './product';

export namespace CatalogTypes {
  export interface CatalogInfo {
    type: string;
    id: string;
    name: string;
    description: string;
    updated_at: number;
    relationships: {
      stock_items: ProductTypes.stockitem[];
    };
  }
}
