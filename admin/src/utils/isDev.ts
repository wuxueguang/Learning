let __dev = false;
if (process.env.NODE_ENV === "development") {
  __dev = true;
}
export const isDev = __dev;
export const enableMock = process.argv.indexOf("--nomock") >= 0 ? false : isDev;
// export const enableMock = false;
