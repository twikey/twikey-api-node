export interface TransactionRequest {
  mandate: string;
  message?: string;
  ref?: string;
  amount: number;
  remittance?: string;
  executionDate?: string;
}

export interface TransactionResponse {
  id: string;
  mandate: string;
  amount: number;
  status: string;
  executionDate: string;
  ref?: string;
  remittance?: string;
}

export interface TransactionFilter {
  mandate?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  include?: string[];
}

export interface TransactionUpdateRequest {
  status?: string;
  executionDate?: string;
}