export interface ReportingEntry {
    name: string;
    msg: string;
    amount: number;
    date: string;
    iban: string;
    bic: string;
}

export interface ReconciliationGenerateRequest {
    sdd?: boolean;
    paylink?: boolean;
    format: string;
}

export interface ReconciliationFile {
    id: string;
    name: string;
    created?: string;
    state?: string;
}
