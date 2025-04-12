export interface BaseInfo {
    l?: string;
    customerNumber?: string | number;
    email?: string;
    lastname?: string;
    firstname?: string;
    mobile?: string;
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    companyName?: string;
    coc?: string;
}

export interface DocumentRequest extends BaseInfo {
    ct: number;
    iban?: string;
    bic?: string;
    mandateNumber?: string;
    contractNumber?: string;
    campaign?: string;
    prefix?: string;
    check?: boolean;
    ed?: number;
    reminderDays?: number;
    sendInvite?: boolean | string;
    token?: string;
    requireValidation?: boolean;
    document?: string;
    transactionAmount?: string;
    transactionMessage?: string;
    transactionRef?: string;
    plan?: string;
    subscriptionStart?: Date;
    subscriptionRecurrence?: string;
    subscriptionStopAfter?: number;
    subscriptionAmount?: number;
    subscriptionMessage?: string;
    subscriptionRef?: string;
}

export interface DocumentSignRequest extends DocumentRequest {
    method: string;
    digsig?: string;
    key?: string;
    signDate?: string;
    place?: string;
    bankSignature?: boolean;
}

export interface DocumentResponse {
    mndtId: string;
    url: string;
    key?: string;
    status?: string;
}

export interface DocumentFeedMessage {
    Mndt: string;
    AmdmtRsn?: string;
    CxlRsn?: string;
    OrgnlMndtId?: string;
    CdtrSchmeId?: string;
    EvtTime?: string;
    EvtId?: string;
    IsNew?: boolean;
    IsUpdated?: boolean;
    IsCancelled?: boolean;
}

export interface FeedOptions {
    includes?: string[];
    start_position?: number;
    last_position?: number;
}
