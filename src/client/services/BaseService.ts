import { AxiosInstance } from "axios";

export interface BaseResponse<T> {
  data:T
  headers: any
}

export interface PdfResponse {
  content: Buffer;
  filename: string;
}

export class BaseService {

  constructor(protected readonly client: AxiosInstance) {}

  protected async get(endpoint: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<BaseResponse<any>> {
    const response = await this.client.get(endpoint, { params, headers });
    return {
      data: response.data,
      headers: response.headers
    };
  }

  protected async post(endpoint: string, data?: any, headers?: Record<string, string>): Promise<BaseResponse<any>> {
    const response = await this.client.post(endpoint, data, { headers });
    return {
      data: response.data,
      headers: response.headers
    };
  }

  protected async put(endpoint: string, data?: any, headers?: Record<string, string>): Promise<BaseResponse<any>> {
    const response = await this.client.put(endpoint, data, { headers });
    return {
      data: response.data,
      headers: response.headers
    };
  }

  protected async patch(endpoint: string, data?: any, headers?: Record<string, string>): Promise<BaseResponse<any>> {
    const response = await this.client.patch(endpoint, data, { headers });
    return {
      data: response.data,
      headers: response.headers
    };
  }

  protected async delete(endpoint: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<BaseResponse<any>> {
    const response = await this.client.delete(endpoint, { params, headers });
    return {
      data: response.data,
      headers: response.headers
    };
  }

}
