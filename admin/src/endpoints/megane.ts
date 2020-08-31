import { fetch } from "@/utils";
import { getMonthLastDay } from '@/utils/date';
import { CooperatorTypes } from "@/types/cooperator";

export default {
  async getCooperators(id: string): Promise< CooperatorTypes.CooperatorInfo[]> {
    const res = await fetch<CooperatorTypes.CooperatorInfo[]>(
      // `/businesses/${id}/partners`
      `/megane/receivers/${id}/cooperators?role=partner`
    );
    if (res.data) return res.data;
    throw new Error("get devices fail");
  },

  // async getSettlements(businessId: string, cooperator_id: string, page): Promise< CooperatorTypes.SettlementInfo[]> {
  //   const res = await fetch<CooperatorTypes.SettlementInfo[]>(
  //     `businesses/${businessId}/cooperators/${cooperator_id}/settlements?page=${page}&per=10`
  //   );
  //   if (res.data) return res.data;
  //   throw new Error("get devices fail");
  // },

  async getIncomeSummary(business_id:string, cooperator_id: string, start_date: string, page: number) {
    const dateNow = getMonthLastDay();
    const res = await fetch<CooperatorTypes.IncomeSummaryInfo[]>(
      `/megane/receivers/${business_id}/cooperators/${cooperator_id}/income_summaries?page=${page}&per=6&scope=settled&from=${start_date}&to=${dateNow}`
    );
    if (res.data) return [res.data, res.pagination && res.pagination.total_count];
    throw new Error("get devices fail");
  }

  // async DeviceActivate(
  //   code: string,
  //   serial_number: string
  // ): Promise<DeviceTypes.DeviceCert> {
  //   const res = await fetch<DeviceTypes.DeviceCert>(
  //     "/offline/biz/devices/activate",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         code: code,
  //         serial_number: serial_number
  //       })
  //     }
  //   );
  //   if (res.data) return res.data;
  //   throw new Error("get device certificate");
  // }

};
