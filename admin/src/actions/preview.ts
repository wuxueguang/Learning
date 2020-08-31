import { Action } from "redux";
import { Behaviors } from "@/constants";
import { PreviewTypes, RequestTypes } from "@/types";
import { Endpoint } from "@/endpoints";

export namespace PreviewAction {
  export interface action extends Action<Behaviors.Preview> {
    type: Behaviors.Preview;
    preview: PreviewTypes.PreviewInfo[];
    epilogue: PreviewTypes.PreviewInfo[];
    coverpic: PreviewTypes.PreviewInfo[];
    previewpagi: RequestTypes.Pagination;
    coverpicpagi: RequestTypes.Pagination;
    epiloguepagi: RequestTypes.Pagination;
  }
  export async function getpreview(per: number, page: number) {
    const type = "preview";
    const [res, pagi] = await Endpoint.Preview.getPreviewLibrary(
      type,
      per,
      page
    );
    const arr: PreviewTypes.PreviewInfo[] = [];
    for (let i = 0; i < res.length; i++) {
      try {
        const tmp = await Endpoint.Zone.getPreview(res[i].file);
        res[i].img = tmp.thumbnail.url_normal_medium;
        if (tmp.entity && tmp.entity.encrypted_offline_medias && tmp.entity.encrypted_offline_medias.length > 0) {
          arr.push(res[i]);
        }
      } catch (_) {}
    }
    return {
      type: Behaviors.Preview.getpreview,
      preview: arr,
      previewpagi: pagi
    };
  }
  export async function getEpilogue(per: number, page: number) {
    const type = "epilogue";
    const [res, pagi] = await Endpoint.Preview.getPreviewLibrary(
      type,
      per,
      page
    );
    for (let i = 0; i < res.length; i++) {
      try {
        const tmp = await Endpoint.Zone.getPreview(res[i].file);
        res[i].img = tmp.thumbnail.url_normal_medium;
        
      } catch (_) {}
    }
    return {
      type: Behaviors.Preview.getEpilogue,
      epilogue: res,
      epiloguepagi: pagi
    };
  }
  export async function getCover(per: number, page: number) {
    const type = "cover_pic";
    const [res, pagi] = await Endpoint.Preview.getPreviewLibrary(
      type,
      per,
      page
    );
    return {
      type: Behaviors.Preview.getcover,
      coverpic: res,
      coverpicpagi: pagi
    };
  }
  export function clean() {
    return {
      type: Behaviors.Preview.clean
    };
  }
}
