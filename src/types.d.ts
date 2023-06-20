// ================== Global ==================

// declaration merging of navigator to support new typescript version
declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
    msSaveOrOpenBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

// ================== Local Types ==================

export type Client = {
  waivers: Waiver[];
  bids: Bid[];
  current_assignment: string;
}

export type Waiver = {
  position: string;
  category: string;
}

export type Bid = {
  position: { title: string; position_number: string; };
  status?: string;
}

export type Filter = {

}

export type Region = {
  text: string;
  value?: string;
  disabled: boolean;
  long_description?: string;
  code?: string;
}

export type Grade = {
  code: string;
  value?: string;
  text?: string;
  name?: string;
}

