type InitConfig = {
  loginOrigin: string,
  iframePath: string,
  loginPath: string,
  loginStatusPath?: string,
  logoutPath: string,
};

type UserInfo = {
  userName: string,
  userId?: string,
  mobile?: string | number,
  email?: string,
};

export {
  InitConfig,
  UserInfo,
}