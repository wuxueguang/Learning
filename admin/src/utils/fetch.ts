import store from "@/store_old";
import { message } from "antd";
import { RequestTypes } from "@/types";
import { conditionalExpression } from "@babel/types";
// import { UserAction } from '@/actions/user'
function getHost() {
  if (__DEV__) {
    return "https://stgapi.veervr.tv";
  } else {
    if (/stgoffline\.veervr\.tv/.test(location.host)) {
      return "https://stgapi.veervr.tv";
    } else if (/offline\.veervr\.tv/.test(location.host)) {
      return "https://api.veervr.tv";
    } else {
      return "https://stgapi.veervr.tv";
    }
  }
}

const host = getHost();
export function WrappedFetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  if (!init) init = {
  };
  const { User } = store.getState();
  const headers: { [key: string]: string } = {};
  if (User.token) headers["Authorization"] = "Bearer " + User.token;
  /// JSON
  headers["Content-Type"] = "application/json";
  init.headers = Object.assign(init.headers || {}, headers);
  return fetch(`${__ENABLEMOCK__ ? "" : host}${input}`, init);
}

export async function FetchJson<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<RequestTypes.ResponsePayload<T>> {
  const res = await WrappedFetch(input, init);
  const data = await (res.json() as Promise<RequestTypes.ResponsePayload<T>>);
  if (res.status >= 400) {
    if (!data.message) {
      data.message = "网络似乎有些问题";
    }
    if (res.status === 404) {
      data.message = "内容资源不存在";
    }
    message.error(data.message);
    throw new Error(data.message);
  } else {
    if (res.status === 200 && data.error_code && data.message) {
      message.error(data.message);
      throw new Error(data.message);
    }
    return data;
  }
}

export default FetchJson;
