export namespace Behaviors {
  export const enum User {
    login = "LOGIN",
    logout = "LOGOUT",
    getPolicy = 'GET_POLICY',
    getPermission = 'GET_PERMISSION'
  }
  export const enum Zones {
    startFetch = "START_FETCH",
    get = "GET",
    add = "ADD",
    update = "UPDATE",
    replace = "REPLACE",
    clean = "CLEAN",
    getzone = "GET_ZONE",
    getCatalogs = 'GET_CATALOGS',
    getDownloadStat = 'GET_DOWNLOAD_STAT'
  }
  export const enum Products {
    get = "PRODUCTS_GET",
    del = "PRODUCTS_DELETE",
    add = "PRODUCTS_ADD",
    clean = "PRODUCT_CLEAN",
    getlib = "PRODUCTS_GET_LIBRARY",
    beforeGetLib = "BEFORE_PRODUCTS_GET_LIBRARY",
    cleanlib = "PRODUCTS_CLEAN_LIBRARY",
    getPrivateStockItems = "PRODUCTS_GET_PRIVATE_STOCKITEMS"
  }
  export const enum Menu {
    change = "MENU_SELECT_CHANGE",
    get = "MENU_ITEM_GET"
  }
  export const enum Preview {
    getpreview = "PREVIEW_GET",
    getEpilogue = 'EPILOGUE_GET',
    getcover = "COVER_PIC_GET",
    clean = "PREVIEW_CLEAN"
  }

  export const enum Catalog {
    startGetPresetCatalog = 'START_PRESET_CATALOG_GET',
    getPresetCatalog = 'PRESET_CATALOG_GET',
    updatePresetCatalog = 'PRESET_CATALOG_UPDATE',
  }

  export const enum Business {
    get = 'GET_BUSINESS'
  }

}

export namespace CONSTANTS {
  export const enum CATALOG_TYPS {
    PRESET = 'preset',
    customized = 'CUSTOMIZED',
  }
}
