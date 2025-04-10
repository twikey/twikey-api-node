import axios, { AxiosInstance } from 'axios';
import { DocumentService } from './services/DocumentService';
import { InvoiceService } from './services/InvoiceService';
import { TransactionService } from './services/TransactionService';
import { WebhookService } from './services/WebhookService';
import { TwikeyConfig, WebhookConfig } from '../models/types';
import { WebhookEvent } from '../models/Webhook';

export class TwikeyClient {
  private readonly client: AxiosInstance;
  
  readonly documents: DocumentService;
  readonly invoices: InvoiceService;
  readonly transactions: TransactionService;
  private apiKey: string;
  private sessionToken?: string;
  readonly maxSessionAge: number = 23 * 60 * 60 * 1000; // max 1day, but use 23 to be safe
  private lastLogin?: number;
  private webhookService?: WebhookService;

  constructor(config: TwikeyConfig) {
    const baseUrl = config.environment === 'production' 
      ? 'https://api.twikey.com/creditor'
      : 'http://api.localtest.me/creditor';

    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'User-Agent': 'Twikey-API-NodeJS/1.0',
        'Content-Type': 'application/json',
        'Authorization': `${config.apiKey}`
      }
    });

    // Add request interceptor for dynamic authorization
    this.client.interceptors.request.use(async config => {
      config.headers.Authorization = await this.getSessionToken();
      return config;
    });

    // Initialize services
    this.documents = new DocumentService(this.client);
    this.invoices = new InvoiceService(this.client);
    this.transactions = new TransactionService(this.client);
    this.apiKey = config.apiKey;
    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          const { status, data } = error.response;
          throw new TwikeyError(status, data.message || 'Unknown error');
        }
        throw error;
      }
    );
  }

  private async getSessionToken(): Promise<string> {
    const now = Date.now();

    if (!this.lastLogin || (now - this.lastLogin) > this.maxSessionAge || !this.sessionToken) {
      const formData = new URLSearchParams();
      formData.append('apiToken', this.apiKey);

      const response = await axios.post(`${this.client.defaults.baseURL}`, formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      if (response.status !== 200) {
        throw new Error('Failed to login');
      }
      this.lastLogin = now;
      this.sessionToken = response.data.Authorization;
      return response.data.Authorization;
    }
    return this.sessionToken;
  }

  // Helper method for making GET requests
  protected async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get(endpoint, { params });
    return response.data;
  }

  // Helper method for making POST requests
  protected async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.post(endpoint, data);
    return response.data;
  }

  /**
   * Configure webhook handling
   */
  configureWebhook(config: WebhookConfig): void {
    this.webhookService = new WebhookService(config);
  }

  /**
   * Handle webhook event
   */
  handleWebhook(payload: string, signature: string): WebhookEvent {
    if (!this.webhookService) {
      throw new Error('Webhook handler not configured. Call configureWebhook first.');
    }
    return this.webhookService.parseEvent(payload, signature);
  }
}

export class TwikeyError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'TwikeyError';
  }
} 