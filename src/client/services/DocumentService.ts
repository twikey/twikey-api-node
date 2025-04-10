import { BaseService } from './BaseService';
import { DocumentTemplate, DocumentRequest, DocumentResponse, DocumentFilter } from '../../models/Document';

export class DocumentService extends BaseService {
  async getTemplates(): Promise<DocumentTemplate[]> {
    return this.get('/ct');
  }

  async create(request: DocumentRequest): Promise<DocumentResponse> {
    return this.post('/invite', request);
  }

  async getDocument(mandateId: string): Promise<any> {
    return this.get(`/mandate/${mandateId}`);
  }

  async listDocuments(filter?: DocumentFilter): Promise<any> {
    return this.get('/mandate', filter);
  }

  async updateStatus(mandateId: string, status: string): Promise<void> {
    await this.post(`/mandate/${mandateId}`, { status });
  }
} 