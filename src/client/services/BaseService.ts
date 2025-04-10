import { AxiosInstance } from 'axios';

export class BaseService {
  constructor(protected readonly client: AxiosInstance) {}

  protected async get(endpoint: string, params?: Record<string, any>) {
    const response = await this.client.get(endpoint, { params });
    return response.data;
  }

  protected async post(endpoint: string, data?: any) {
    const response = await this.client.post(endpoint, data);
    return response.data;
  }

  async login(apiKey: string): Promise<void> {
    await this.post(``, { apiKey });
  }
} 