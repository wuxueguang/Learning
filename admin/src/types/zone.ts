import { string } from "prop-types";
import preview from "@/reducers/preview";
import { ProductTypes } from './product';

export namespace ZoneTypes {


  export interface CatalogInfo {
    id: string;
    catalog_type: string;
    distribution_status: string;
    status: string;
    preset_catalog_has_update: boolean;
    released_at: string;
    release_at: string;
    released_date: string;
    release_date: string;
    relationships: {
      product: ProductTypes.stockitem[];
    };
    release_count: number;
    total_count: number;
    off_the_screen_count: number;
  }

  export interface downloadDeviceInfo {
    connected: boolean;
    download_progress: {
      percent: number;
      state: string;
    }
    network: string;
    sequence: number;
  }
  export interface DownloadInfo {
    id: string;
    disconnected_devices_count: number;
    downloaded_devices_count: number;
    downloading_devices_count: number;
    name: string;
    relationships: {
      devices: downloadDeviceInfo[];
    }
  }

  export interface downloadCatalogInfo {
    catalog_type: string;
    released_at: string;
    release_at: string;
    released_date: string;
    relationships: {
      product: ProductTypes.stockitem[];
    };
    release_count: number;
    total_count: number;
    off_the_screen_count: number;
  }
  export interface ZoneInfo {
    target: "zone";
    id: string;
    name: string;
    address: string;
    qr_code: string;
    contents_count?: number;
    tickets_count?: number;
    total_income?: number;
    total_cash_income?: number;
    previewimg?: string;
    epilogueimg?: string;
    products_count?: number;
    disconnected_devices_count: number;
    downloading_devices_count: number;
    pause_downloading_devices_count: number;
    playing_devices_count: number;
    pause_playing_devices_count: number;
    standby_devices_count: number;
    catalogs: CatalogInfo[];
    downloadStat: downloadCatalogInfo[];
    device_count?: {
      playing_count?: number;
      standby_count?: number;
      downloading_count?: number;
      offline_count?: number;
    };
    param?: { [key: string]: any };
    relationships?: {
      business: BizInfo;
      cover_pic: preview;
      preview: preview;
      epilogue: preview;
      prologue?: preview;
    };
  }
  export interface zoneMenu {
    name: string;
    target: "zone";
    group?: boolean;
    type?: string;
    flag?: string;
    param?: {
      id: string;
    };
  }
  export interface BizInfo {
    id: string;
    name: string;
    description: string;
    phone: string;
    address: string;
  }
  export interface preview {
    id: string;
    type: "zoneAsset";
    asset_type: "preview";
    name?: string;
    file?: string;
  }
  export interface zoneModal {
    title: string;
    cancel: string;
    confirm: string;
  }
}
