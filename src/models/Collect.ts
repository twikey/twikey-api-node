export interface CollectRequest {
    ct: number;
    mndtId: string;
    message: string;
    amount: number;
    ref?: string;
    date?: string;
    place?: string;
}

export interface CollectResponse {
    id: string;
    state: string;
    amount: number;
    ref?: string;
}

export interface CollectQueryRequest {
    [key: string]: string | number | boolean | undefined;
}
