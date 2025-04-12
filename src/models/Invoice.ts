import {Customer} from "./Customer";

export interface InvoiceRequest {
  id?: string;
  number: string;
  title?: string;
  remittance?: string;
  ref?: string;
  ct?: string;
  amount: number;
  date: string;
  duedate: string;
  locale?: string;
  customer: Customer;
  customerByDocument?: string;
  manual?: boolean;
  pdf?: string;
  redirectUrl?: string;
  email?: string;
  relatedInvoiceNumber?: string;
}

export interface InvoiceResponse {
  id: string; // Invoice ID
  url?: string; // Payment URL (if applicable)
  state: string; // Invoice state
  number: string; // Invoice number
}

export interface InvoiceUpdateRequest {
  state?: string; // New state
  amount?: number; // New amount in cents
  duedate?: string; // New due date (YYYYMMDD)
  message?: string; // New message
}
