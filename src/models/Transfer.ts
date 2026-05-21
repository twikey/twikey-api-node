export interface BeneficiaryRequest {
    customerNumber?: string;
    name: string;
    iban: string;
    bic?: string;
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
}

export interface BeneficiaryResponse {
    iban: string;
    name: string;
    bic?: string;
    customerNumber?: string;
    state?: string;
}

export interface TransferRequest {
    ref?: string;
    message: string;
    amount: number;
    iban: string;
    bic?: string;
    name?: string;
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    ct?: number;
}

export interface TransferCompleteRequest {
    ref: string;
}
