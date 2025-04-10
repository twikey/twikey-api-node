export interface DocumentTemplate {
  id: number;
  title: string;
  description?: string;
  mandateLanguage?: string;
  type?: string;
}

export interface DocumentRequest {
  ct?: string;
  iban?: string;
  bic?: string;
  customer: {
    number?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    address?: {
      street?: string;
      city?: string;
      postcode?: string;
      country?: string;
    };
    language?: string;
    mobile?: string;
  };
  campaign?: string;
  reminderDays?: number;
  redirectUrl?: string;
  errorUrl?: string;
}

export interface DocumentResponse {
  mndtId: string;
  url: string;
  key?: string;
  status?: string;
}

export interface DocumentFilter {
  ct?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  include?: string[];
}