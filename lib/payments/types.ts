export type PaymentGatewayType = 'jazzcash' | 'easypaisa' | 'bank-transfer';

export interface PaymentConfig {
  merchantId?: string;
  apiKey?: string;
  secret?: string;
  storeId?: string;
  callbackUrl?: string;
  [key: string]: any;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  transactionId?: string;
  error?: string;
  data?: any;
}