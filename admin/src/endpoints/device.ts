import { fetch } from "@/utils";
import { DeviceTypes } from "@/types";

export default {
  async getDevices(id: string): Promise<DeviceTypes.DeviceInfo[]> {
    const res = await fetch<DeviceTypes.DeviceInfo[]>(
      `/offline/biz/zones/${id}/devices`
    );
    if (res.data) return res.data;
    throw new Error("get devices fail");
  },

  async getDevicesSource(id: string, page: number): Promise<any> {
    const res = await fetch<DeviceTypes.DeviceInfo[]>(
      `/offline/biz/zones/${id}/devices?page=${page}&per=10&sort=+sequence`
    );
    if (res.data && res.pagination) {
      return res;
    }
    throw new Error("get devices fail");
  },

  async getDeviceActivation(id: string): Promise<DeviceTypes.DeviceActive> {
    const res = await fetch<DeviceTypes.DeviceActive>(
      `/offline/biz/zones/${id}/activations`,
      {
        method: "POST"
      }
    );
    if (res.data) return res.data;
    throw new Error("unable activate device");
  },

  async getDeviceQrcode(id: string): Promise<any> {
    const res = await fetch<any>(`/offline/biz/device/${id}/qr_code`);
    if (res.data) return res.data;
    throw new Error("unable generate device qrcode");
  },
  async DeviceActivate(
    code: string,
    serial_number: string
  ): Promise<DeviceTypes.DeviceCert> {
    const res = await fetch<DeviceTypes.DeviceCert>(
      "/offline/biz/devices/activate",
      {
        method: "POST",
        body: JSON.stringify({
          code: code,
          serial_number: serial_number
        })
      }
    );
    if (res.data) return res.data;
    throw new Error("get device certificate");
  },

  async getDeviceInfo(id: string): Promise<DeviceTypes.DeviceInfo> {
    const res = await fetch<DeviceTypes.DeviceInfo>(
      `/offline/biz/device/${id}`
    );
    if (res.data) return res.data;
    throw new Error("get device info error");
  },

  async updateDeviceSequence(
    id: string,
    sequence: string
  ): Promise<DeviceTypes.DeviceCert> {
    const res = await fetch<DeviceTypes.DeviceCert>(
      `/offline/biz/devices/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          sequence: Number(sequence),
        })
      }
    );
    if (res.data) return res.data;
    throw new Error("Update device Sequence Error");
  },

};
