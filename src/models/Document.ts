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
    vatno?: string;
    peppol?: string;
    delivery?: string;
}

export interface DocumentRequest extends BaseInfo {
    ct?: number;
    tc?: string;          // scheme type code: 'CORE' | 'B2B' | 'RCC' | 'PAD' | 'BACS' etc.
    iban?: string;
    bic?: string;
    accountnumber?: string; // UK/BACS: 8-digit bank account number
    sortcode?: string;      // UK/BACS: sort code in XX-XX-XX format
    subregion?: string;     // UK/BACS: e.g. 'bacs'
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

export interface DocumentUpdateRequest {
    state?: 'active' | 'passive'; // 'passive' = suspend (uncollectable), 'active' = resume
    iban?: string;
    bic?: string;
    mobile?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    companyName?: string;
    coc?: string;
    l?: string;
    customerNumber?: string;
    ct?: number;
}

export interface CustomerAccessResponse {
    token: string;
    url: string;
}

export interface PdfResponse {
    content: Buffer;
    filename: string;
}

export interface DocumentQueryRequest {
    iban?: string;
    customerNumber?: string;
    email?: string;
    state?: 'SIGNED' | 'PREPARED' | 'CANCELLED';
    page?: number;
}

export interface DocumentContract {
    mandateNumber: string;
    state: string;
    [key: string]: any;
}

export interface DocumentQueryResponse {
    Contracts: DocumentContract[];
    _links?: { self: string };
}

