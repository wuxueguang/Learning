import { fetch } from "@/utils";
import { MiscTypes } from "@/types";

export default {
    async getMenu(): Promise<MiscTypes.MenusItem[]>{
        const res = await fetch<MiscTypes.MenusItem[]>("/offline/business/menu");
        if(res.data)
            return res.data;
        throw new Error("unable fetch menu");
    }
}