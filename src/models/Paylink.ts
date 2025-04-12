import {BaseInfo} from "./Document";

export interface PaylinkRequest extends BaseInfo {
    ct: number;
    sendInvite?: boolean | string;

    message: string;
    remittance?: string;
    ref: string;
    redirectUrl?: string;
    place?: string;
    method?: string;
    invoice?: string;
    amount: number;
    isTemplate?: boolean;
}

export interface PaylinkResponse {
    id: number;
    url: string;
    msg: string;
    amount: number;
    ref: string;
    state?: string;
}
