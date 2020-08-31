export namespace UserTypes {
  export interface LoginResponse {
    access_token: string;
    user: UserBasicInfo;
  }

  export interface PolicyInfo {
    safe_id: string;
    code: string;
  }

  export interface UserBasicInfo {
    id: number;
    uid: string;
    username: string;
    name: string;
    phone: string;
    address: string;
  }

  // export interface PermissionCode {
  //   code: number
  // }
}
