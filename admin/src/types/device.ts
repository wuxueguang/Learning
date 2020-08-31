import { ZoneTypes } from "./zone";
export namespace DeviceTypes {
  export type DeviceStatus =
    | "offline"
    | "playing"
    | "standby"
    | "pause_playing"
    | "downloaded"
    | "downloading"
    | "download_failed";
  export type DeviceMode = "admin" | "user";
  export interface DeviceInfo {
    type: "device";
    id: string;
    uid: string;
    thing_name: string;
    sequence: number;
    alias: string;
    qr_code: string;
    mode: DeviceMode;
    connected: boolean;
    state: DeviceStatus;
    renewstatus?: string;
    relationships: {
      zone: ZoneTypes.ZoneInfo;
    };
  }

  export interface DeviceActive {
    type: "device_activation_code";
    activation_code: string;
  }
  export interface DeviceCert {
    type: "device_cert";
    public_key: string;
    private_key: string;
    cert: string;
    thing_name: string;
  }
}
