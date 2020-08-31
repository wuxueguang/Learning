import { ProductTypes } from "@/types";


function findProductPrice(stockItemId: string, products: ProductTypes.ProductInfo[]) {
  let price;
  products.forEach((product) => {
    if (product.relationships.stock_item.id === stockItemId) {
      price = product.price;
    }
  });
  return price;
}

export function setPresetCatalogPrice(products: ProductTypes.ProductInfo[], stockitems: ProductTypes.stockitem[]) {
  const arr: any [] = [];
  stockitems.forEach((item) => {
    const newItem = fastClone(item);
    newItem.price = findProductPrice(newItem.id, products);
    if (!newItem.price) {
      newItem.price = item.default_sales_price;
    }
    arr.push(fastClone(newItem));
  });
  return arr;
}

function fastClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function findProductRelationships(stockItemId: string, products: ProductTypes.ProductInfo[]) {
  let tags;
  products.forEach((product) => {
    if (product.id === stockItemId) {
      tags = product.relationships.tags;
    }
  });
  return tags;
}

export function setDefaultStockItemsTags(products: ProductTypes.ProductInfo[], stockitems: ProductTypes.ProductInfo[]) {
  const arr: any [] = [];
  stockitems.forEach((item) => {
    const newItem = fastClone(item);
    if (newItem.relationships && newItem.relationships.stock_item) {
      newItem.relationships.tags = findProductRelationships(newItem.relationships.stock_item.id, products);
    }
    if (!newItem.price) {
      newItem.price = newItem.default_sales_price || "";
    }
    newItem._id = '' + Math.random() * 100000;
    arr.push(fastClone(newItem));
  });
  return arr;
}

export function setProductsMinPrice(products: ProductTypes.ProductInfo[]) {
  const arr: any [] = [];
  products.forEach((item) => {
    const newItem = fastClone(item);
    newItem.min_price = newItem.relationships.stock_item.min_price;
    newItem.id = newItem.relationships.stock_item.id;
    arr.push(fastClone(newItem));
  });
  return arr;
}



export function setDefaultPresetCatalogPrice(stockitems: ProductTypes.stockitem[]) {
  const arr: any [] = [];
  stockitems.forEach((item) => {
    const newItem = fastClone(item);
    if (!newItem.price) {
      newItem.price = newItem.default_sales_price;
    }
    arr.push(newItem);
  });
  return arr;
}



