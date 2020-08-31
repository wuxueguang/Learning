export namespace PreviewTypes {
  export interface PreviewInfo {
    asset_type: "preview" | "cover_pic" | "epilogue";
    file: string;
    id: string;
    name: string;
    type: "zoneAsset";
    img?: string;
  }
  // export interface CoverInfo {
  //   asset_type: "cover_pic";
  //   file: string;
  //   id: string;
  //   name: string;
  //   type: "zoneAsset";
  // }
}
