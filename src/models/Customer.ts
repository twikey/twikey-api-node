export interface CustomerAddress {
  street?: string;
  city?: string;
  postcode?: string;
  country?: string;
}

export interface Customer {
  number?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  address?: CustomerAddress;
  language?: string;
  mobile?: string;
  companyName?: string;
  vatNumber?: string;
  mandateNumber?: string;
} 