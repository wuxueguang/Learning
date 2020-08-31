import { fetch } from '@/utils';
import { UserTypes } from '@/types';

export default {
    login(username: string, password: string){
        return fetch<UserTypes.LoginResponse>('/users/signin',{
            method:"POST",
            body:JSON.stringify({
                identifier:username,
                password:password
            })
        });
    },

    async logout(){

    },

    async getPolicy(uid: string) {
      return fetch<UserTypes.PolicyInfo[]>(`/thor/users/${uid}/privileges`,{
        method:"GET",
      });
    },

    async getPermission() {
      return fetch<number[]>(`/thor/users/permission`,{
        method:"GET",
      });
    }
}