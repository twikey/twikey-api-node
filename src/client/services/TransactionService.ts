import { BaseService } from './BaseService';
import { TransactionRequest, TransactionResponse, TransactionFilter, TransactionUpdateRequest } from '../../models/Transaction';

export class TransactionService extends BaseService {
  async create(request: TransactionRequest): Promise<TransactionResponse> {
    return this.post('/transaction', request);
  }

  async getTransaction(transactionId: string): Promise<TransactionResponse> {
    return this.get(`/transaction/${transactionId}`);
  }

  async listTransactions(filter?: TransactionFilter): Promise<TransactionResponse[]> {
    return this.get('/transaction', filter);
  }

  async updateTransaction(transactionId: string, update: TransactionUpdateRequest): Promise<TransactionResponse> {
    return this.post(`/transaction/${transactionId}`, update);
  }

  async feed(transactions: TransactionRequest[]): Promise<TransactionResponse[]> {
    return this.post('/transaction/feed', { transactions });
  }
} 