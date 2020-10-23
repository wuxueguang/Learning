type InitConfig = {
  loginOrigin: string,
  iframePath: string,
  loginPath: string,
  logoutPath: string,
  loginStatusPath?: string,
};

type UserInfo = {
  userName: string,
  userId?: string,
  mobile?: string | number,
  email?: string,
};

type ValidateInfo = {
  name?: string,
  password: string,
  mobile?: string,
  validateCode?: string,
};

export {
  InitConfig,
  UserInfo,
  ValidateInfo,
}