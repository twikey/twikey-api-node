import { AxiosInstance } from "axios";

export interface BaseResponse<T> {
  data:T
  headers: any
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

}
