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

export interface PaymentResponse {
  eventId: string;
  eventType: "payment" | "payment_failure" | "refund";
  occurredAt: string; // ISO date string
  amount: number;
  currency: string;
  origin: Origin;
  gateway: Gateway;
  details: object;
  error?: EventError;
}

export interface Origin {
  object: "invoice";
  id: string;
  number: string;
  ref: string;
}

export interface Gateway {
  id: number;
  name: string;
  type: "bank" | "psp";
  iban: string | null;
}

export interface EventError {
  code: string;
  description: string;
  category: string;
  externalCode: string;
  action?: string;
  actionStep?: number;
}

export interface InvoiceUpdateRequest {
  state?: string;
  amount?: number;
  duedate?: string;
  message?: string;
}

export interface InvoiceQrResponse {
  url: string;
  qr?: string;
}

export interface InvoiceActionRequest {
  type: string;
  extra?: string[];
}

export interface InvoiceBulkResult {
  batchId: string;
}

export interface InvoiceBulkEntry {
  id: string;
  status: string;
}
