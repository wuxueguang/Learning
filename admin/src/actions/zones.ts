import { Action } from "redux";
import { Behaviors } from "@/constants";
import { ZoneTypes, RequestTypes } from "@/types";
import { Endpoint } from "@/endpoints";

export namespace ZoneAction {
  export interface action extends Action<Behaviors.Zones> {
    type: Behaviors.Zones;
    zones: ZoneTypes.ZoneInfo[];
    zone: ZoneTypes.ZoneInfo;
    pagination?: RequestTypes.Pagination;
    catalogs: ZoneTypes.CatalogInfo[];
  }

  export function startFetch() {
    return {
      type: Behaviors.Zones.startFetch,
      zones: [],
    };
  }

  export async function get(per: number, page: number) {
    startFetch();
    const [res, pagi] = await Endpoint.Zone.getZones(per, page);
    let tmp: any[] = [];
    let obj: any;
    if (res && res.length > 0) {
      for (const val of res) {
        obj = val;
        if (/dashboard$/.test(location.pathname)) {
          try {
            const res2 = await Endpoint.Device.getDevices(val.id);
            let standby = 0,
              playing = 0,
              downloading = 0,
              offline = 0;
            res2.forEach(val => {
              if (!val.connected) {
                offline++;
              } else if (val.state === "standby") {
                standby++;
              } else if (val.state === "playing") {
                playing++;
              } else if (val.state === "downloading") {
                downloading++;
              }
            });
            obj.device_count = {
              standby_count: standby,
              offline_count: offline,
              playing_count: playing,
              downloading_count: downloading
            };
          } catch (_) {}
        }

        tmp.push(obj);
      }
    }
    return {
      type: Behaviors.Zones.get,
      zones: tmp,
      pagination: pagi
    };
  }

  export async function add(name: string, address: string) {
    const res = await Endpoint.Zone.createZone(name, address);
    return {
      type: Behaviors.Zones.add,
      zones: [res]
    };
  }

  export async function getZone(id: string) {
    const res = await Endpoint.Zone.getZone(id);
    if (res.relationships && res.relationships.preview.file) {
      const res2 = await Endpoint.Zone.getPreview(
        res.relationships.preview.file
      );
      res.previewimg = res2.thumbnail.url_normal_medium;
    }
    if (res.relationships && res.relationships.epilogue.file) {
      const res3 = await Endpoint.Zone.getPreview(
        res.relationships.epilogue.file
      );
      res.epilogueimg = res3.thumbnail.url_normal_medium;
    }
    return {
      type: Behaviors.Zones.getzone,
      zone: res
    };
  }
  export async function update(id: string, name: string, address: string) {
    const res = await Endpoint.Zone.updateZone(id, name, address);
    return {
      type: Behaviors.Zones.update,
      zones: [res]
    };
  }

  export function replace(zones: ZoneTypes.ZoneInfo[]) {
    return {
      type: Behaviors.Zones.replace,
      zones: zones
    };
  }

  export function clean() {
    return {
      type: Behaviors.Zones.clean
    };
  }

  export async function getCatalog(id: string) {
    const result = await Endpoint.Zone.getCatalogs(id);
    return {
      type: Behaviors.Zones.getCatalogs,
      catalogs: result
    }
  }

  export async function getDownloadStat(id: string) {
    const result = await Endpoint.Zone.getDownloadStat(id);
    return {
      type: Behaviors.Zones.getDownloadStat,
      downloadStat: result
    };
  }
}
