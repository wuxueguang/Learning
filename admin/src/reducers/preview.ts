import { PreviewAction } from "@/actions";
import { PreviewTypes, RequestTypes } from "@/types";
import { Behaviors } from "@/constants";
import preview from "@/endpoints/preview";

export interface PreviewState {
  preview: PreviewTypes.PreviewInfo[];
  coverpic: PreviewTypes.PreviewInfo[];
  epilogue: PreviewTypes.PreviewInfo[];
  previewpagi?: RequestTypes.Pagination;
  coverpicpagi?: RequestTypes.Pagination;
  epiloguepagi?: RequestTypes.Pagination;
}

const defaultPreviewState: PreviewState = { preview: [], coverpic: [], epilogue: [] };

export default function(
  state: PreviewState = defaultPreviewState,
  action: PreviewAction.action
) {
  switch (action.type) {
    case Behaviors.Preview.getpreview:
      state.preview = state.preview.concat(action.preview);
      state.previewpagi = action.previewpagi;
      return Object.assign({}, state);
    case Behaviors.Preview.getEpilogue:
      state.epilogue = state.epilogue.concat(action.epilogue);
      state.epiloguepagi = action.epiloguepagi;
      return Object.assign({}, state);
    case Behaviors.Preview.getcover:
      state.coverpic = state.coverpic.concat(action.coverpic);
      state.coverpicpagi = action.coverpicpagi;
      return Object.assign({}, state);
    case Behaviors.Preview.clean:
      const pagi: RequestTypes.Pagination = {
        current_page: 1,
        total_page: 1,
        total_count: 0,
        size: 0
      };
      state.coverpic = [];
      state.preview = [];
      state.epilogue = [];
      state.coverpicpagi = pagi;
      state.previewpagi = pagi;
      state.epiloguepagi = pagi;
      return Object.assign({}, state);
    default:
      return state;
  }
}
