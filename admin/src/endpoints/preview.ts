import { fetch } from "@/utils";
import { PreviewTypes, RequestTypes } from "@/types";

export default {
  async getPreviewLibrary(
    type: string,
    per: number,
    page: number
  ): Promise<[PreviewTypes.PreviewInfo[], RequestTypes.Pagination]> {
    const res = await fetch<PreviewTypes.PreviewInfo[]>(
      `/offline/biz/zone_assets?type=${type}&page=${page}&per=${per}`
    );
    if (res.data) return [res.data, res.pagination!];
    throw new Error("get preview video fail");
  },
  async updatePreview(
    id: string,
    name: string,
    address: string,
    preview_id: string,
    epilogue_id: string,
    cover_pic_id: string
  ): Promise<void> {
    const res = await fetch<void>(`/offline/biz/zones/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        address: address,
        epilogue_id,
        preview_id,
        cover_pic_id
      })
    });
  }
};
