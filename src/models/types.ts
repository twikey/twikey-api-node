export interface TwikeyConfig {
  apiKey: string;
  environment?: 'production' | 'sandbox';
}

export interface WebhookConfig {
  webhookKey: string;
} 