import { PaymentConfig, PaymentRequest, PaymentResponse } from './types';

export default abstract class PaymentGateway {
  protected config: PaymentConfig;

  constructor(config: PaymentConfig) {
    this.config = config;
  }

  abstract initiatePayment(request: PaymentRequest): Promise<PaymentResponse>;
  abstract verifyPayment(transactionId: string): Promise<PaymentResponse>;
  abstract refundPayment(transactionId: string, amount?: number): Promise<PaymentResponse>;

  protected validateConfig(): void {
    if (!this.config.merchantId || !this.config.apiKey) {
      throw new Error('Payment gateway configuration is incomplete');
    }
  }
}