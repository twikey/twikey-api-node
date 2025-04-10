import { WebhookConfig, WebhookEvent } from '../../models/Webhook';
import crypto from 'crypto';

export class WebhookService {
  constructor(private readonly config: WebhookConfig) {}

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

  parseEvent(payload: string, signature: string): WebhookEvent {
    if (!this.verifySignature(payload, signature)) {
      throw new Error('Invalid webhook signature');
    }

    return JSON.parse(payload) as WebhookEvent;
  }
} 