import crypto from 'crypto';

export interface WebhookEvent {
  type: string;           // Event type
  timestamp: number;      // Event timestamp
  payload: any;          // Event payload
}

export interface WebhookConfig {
  webhookKey: string;    // Webhook signing key
}

export class WebhookHandler {
  constructor(private readonly config: WebhookConfig) {}

  /**
   * Verify the webhook signature
   */
  verifySignature(payload: string, signature: string): boolean {
    const hmac = crypto
      .createHmac('sha256', this.config.webhookKey)
      .update(payload)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(hmac)
    );
  }

  /**
   * Parse and verify webhook event
   */
  parseEvent(payload: string, signature: string): WebhookEvent {
    if (!this.verifySignature(payload, signature)) {
      throw new Error('Invalid webhook signature');
    }

    const event = JSON.parse(payload);
    return event as WebhookEvent;
  }
} 