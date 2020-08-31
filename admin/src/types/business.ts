
export namespace BusinessTypes {

  export type StaffInfo = {
    id: string,
    type: string,
    user_id: number,
    relationships: {}
  };

  export type FeatureFlagInfo = {
    id: string;
    name: string;
  };

  export interface BusinessInfo {
    id: string;
    type: string;
    name: string;
    description: string;
    phone: string,
    address: string;
    consumers_count: 1;
    tickets_count: number;
    total_income: string;
    created_at: number;
    relationships: {
      staff: StaffInfo[];
      feature_flags: FeatureFlagInfo[];
    };
  };
}
