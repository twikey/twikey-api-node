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

  protected async getPdf(endpoint: string, filename: string): Promise<PdfResponse> {
    const response = await this.client.get(endpoint, {
      headers: { 'Accept': 'application/pdf' },
      responseType: 'arraybuffer'
    });

    return {
      content: Buffer.from(response.data),
      filename
    };
  }

  protected async post(endpoint: string, data?: any, headers?: Record<string, string>): Promise<BaseResponse<any>> {
    const response = await this.client.post(endpoint, data, { headers });
    return {
      data: response.data,
      headers: response.headers
    };
  }

  protected async postPdf(endpoint: string, pdfContent: Buffer): Promise<void> {
    await this.client.post(endpoint, pdfContent, {
      headers: { 'Content-Type': 'application/pdf' }
    });
  }

}
