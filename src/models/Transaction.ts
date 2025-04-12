export interface TransactionRequest {
    mndtId: string;
    date?: string;
    reqcolldt?: string;
    message: string;
    ref?: string;
    amount: number;
    place?: string;
    refase2e?: boolean;
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
