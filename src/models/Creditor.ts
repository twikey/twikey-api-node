export interface CustomerRequest {
    firstname?: string;
    lastname?: string;
    email?: string;
    companyName?: string;
    coc?: string;
    vatno?: string;
    peppol?: string;
    delivery?: string;
    customerNo?: string;
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    l?: string;
    mobile?: string;
    ct?: number;
}

export interface CustomerResponse {
    customerNumber?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    companyName?: string;
    coc?: string;
    vatno?: string;
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    mobile?: string;
    language?: string;
}