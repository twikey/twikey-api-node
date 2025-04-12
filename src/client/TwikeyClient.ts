import axios, {AxiosInstance} from "axios";
import {DocumentService} from "./services/DocumentService";
import {InvoiceService} from "./services/InvoiceService";
import {TransactionService} from "./services/TransactionService";
import {TwikeyConfig} from "../models/types";
import {PaylinkService} from "./services/PaylinkService";
import {SubscriptionService} from "./services/SubscriptionService";
import {createHmac, timingSafeEqual} from "node:crypto";

export class TwikeyClient {

  private readonly client: AxiosInstance;

  readonly document: DocumentService;
  readonly invoice: InvoiceService;
  readonly transaction: TransactionService;
  readonly paylink: PaylinkService;
  readonly subscription: SubscriptionService;

  readonly apiKey: string;
  private sessionToken?: string;
  readonly maxSessionAge: number = 23 * 60 * 60 * 1000; // max 1day, but use 23 to be safe
  private lastLogin?: number;

  constructor(config: TwikeyConfig) {
    const baseUrl = config.apiUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "User-Agent": config.userAgent || "Twikey-NodeJS/1.0",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `${config.apiKey}`,
      },
    });

    // Initialize services
    this.document = new DocumentService(this.client);
    this.invoice = new InvoiceService(this.client);
    this.transaction = new TransactionService(this.client);
    this.paylink = new PaylinkService(this.client);
    this.subscription = new SubscriptionService(this.client);

    this.apiKey = config.apiKey;

    // Add request interceptor for dynamic authorization
    this.client.interceptors.request.use(async (config) => {
      config.headers.Authorization = await this.getSessionToken();
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const { status, data } = error.response;
          throw new TwikeyError(status, data.code, data.extra);
        }
        throw error;
      },
    );
  }

  private async getSessionToken(): Promise<string> {
    const now = Date.now();

    if (!this.lastLogin || now - this.lastLogin > this.maxSessionAge || !this.sessionToken) {
      const formData = new URLSearchParams();
      formData.append("apiToken", this.apiKey);

      const response = await axios.post(`${this.client.defaults.baseURL}`,
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );
      if (response.status !== 200) {
        throw new Error("Failed to login");
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
  protected async post<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<T> {
    const response = await this.client.post(endpoint, data, { headers });
    return response.data;
  }

  /**
   * Handle webhook event
   */
  verifyWebHookSignature(signature: string,payload: string): boolean {
    const hmac = createHmac("sha256", this.apiKey)
        .update(payload)
        .digest("hex");

    return timingSafeEqual(Buffer.from(signature.toLowerCase()), Buffer.from(hmac));
  }

  async ping() {
    return await this.getSessionToken();
  }
}

export class TwikeyError extends Error {
  constructor(statusCode: number,code: string,extra: string) {
    super(`status=${statusCode} error=${code}` + (extra?` extra=${extra}`:''));
  }
}
