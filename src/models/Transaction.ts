export interface TransactionRequest {
    mndtId: string;
    date?: string;
    reqcolldt?: string;
    message: string;
    ref?: string;
    amount: number;
    place?: string;
    refase2e?: boolean;
    reservation?: boolean;
}

export interface Transaction {
    id: string;
    mandate: string;
    amount: number;
    status: string;
    executionDate: string;
    ref?: string;
    remittance?: string;
}

export interface TransactionResponse {
    Entries: Transaction[];
}

export interface TransactionUpdateRequest {
    status?: string;
    executionDate?: string;
}

export interface TransactionActionRequest {
    id?: string;
    ref?: string;
    action: string;
}

export interface TransactionRefundRequest {
    id?: string;
    ref?: string;
    amount?: number;
    message?: string;
}

export interface TransactionRemoveRequest {
    id?: string;
    ref?: string;
}

export interface TransactionQueryRequest {
    fromId?: string;
    [key: string]: string | number | boolean | undefined;
}

export interface TransactionBulkResult {
    batchId: string;
}

export interface TransactionBulkEntry {
    id: number;
    ref: string | null;
    mndtId: string;
    status: string;
}
