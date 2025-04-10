import { BaseService } from './BaseService';
import { InvoiceRequest, InvoiceResponse, InvoiceFilter, InvoiceUpdateRequest } from '../../models/Invoice';

export class InvoiceService extends BaseService {
  async create(request: InvoiceRequest): Promise<InvoiceResponse> {
    return this.post('/invoice', request);
  }

  async getInvoice(invoiceId: string): Promise<InvoiceResponse> {
    return this.get(`/invoice/${invoiceId}`);
  }

  async listInvoices(filter?: InvoiceFilter): Promise<InvoiceResponse[]> {
    return this.get('/invoice');
  }

  async update(invoiceId: string, update: InvoiceUpdateRequest): Promise<InvoiceResponse> {
    return this.post(`/invoice/${invoiceId}`, update);
  }

  async feed(invoices: InvoiceRequest[]): Promise<InvoiceResponse[]> {
    return this.post('/invoice/feed', { invoices });
  }
} 