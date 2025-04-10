export interface InvoiceRequest {
  number: string;           // Invoice number
  title?: string;           // Invoice title
  remittance?: string;      // Remittance information
  amount: number;           // Amount in cents
  customerNumber?: string;  // Customer number
  email?: string;           // Customer email
  mandateNumber?: string;   // Mandate number (if using direct debit)
  duedate?: string;         // Due date (YYYYMMDD)
  ref?: string;             // Your reference
  description?: string;     // Invoice description
  template?: string;        // Template to use
  message?: string;         // Message to include
  reminderDays?: number;    // Number of days before sending a reminder
}

export interface InvoiceResponse {
  id: string;           // Invoice ID
  url?: string;         // Payment URL (if applicable)
  state: string;        // Invoice state
  number: string;       // Invoice number
}

export interface InvoiceFilter {
  number?: string;      // Invoice number
  ref?: string;         // Reference
  state?: string;       // State filter
  dateFrom?: string;    // Start date (YYYYMMDD)
  dateTo?: string;      // End date (YYYYMMDD)
  include?: string[];   // Include specific fields
}

export interface InvoiceUpdateRequest {
  state?: string;       // New state
  amount?: number;      // New amount in cents
  duedate?: string;     // New due date (YYYYMMDD)
  message?: string;     // New message
} 