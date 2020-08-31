export namespace CooperatorTypes {
  export interface CooperatorInfo {
    safe_id: string;
    receiver_safe_id: string;
    name: string;
    info: string;
    balance_cycle: string;
    split: string;
    available_from: string;
  }

  export interface SettlementInfo {
    safe_id: string;
    settled_from: string;
    settled_to: string;
    revenue: string;
    split: string;
    settlement_amount: string;
  }

  export interface IncomeSummaryInfo {
    period: string;
    sharing_mode: {
      display: string;
      sub_sharing_modes?: {
        display: string;
      }[]
    };
    revenue: string;
    revenue_without_tax: string;
    partners_sharing: string;
  }

  export interface PartnerInfo {
    cooperator_safe_id: string;
    name: string;
    description: string;
    sharing_mode: {
      display: string;
    };
    balance_cycle: string;
    cooperated_from: number;
  }
}
