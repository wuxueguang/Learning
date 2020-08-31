import _ from 'lodash';
import Store from "@/store_old";

export default function havePermission(requiredRule) {
//   if ( __IS_DEV__ ) {
//     return true
//   }
  const permissions = Store.getState().User.permission;
  const token = Store.getState().User.token;

  if (!permissions || !token) {
    return false;
  }

  if (!requiredRule) {
    return true;
  }

  return permissions.some(item => item == requiredRule)
}
