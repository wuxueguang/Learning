// export * from './isDev';
export { default as fetch, WrappedFetch, FetchJson } from "./fetch";

export function isDev() {
  if (__DEV__) {
    return true
  } else if(/stgoffline\.veervr\.tv/.test(location.host)) {
    return true;
  }
  return false;
}
