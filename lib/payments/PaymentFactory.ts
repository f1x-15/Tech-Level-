import { PaymentGatewayType, PaymentConfig } from './types';
import JazzCashGateway from './JazzCashGateway';
import EasypaisaGateway from './EasypaisaGateway';
import BankTransferGateway from './BankTransferGateway';

export class PaymentFactory {
  static createGateway(type: PaymentGatewayType, config: PaymentConfig) {
    switch (type) {
      case 'jazzcash':
        return new JazzCashGateway(config);
      case 'easypaisa':
        return new EasypaisaGateway(config);
      case 'bank-transfer':
        return new BankTransferGateway(config);
      default:
        throw new Error(`Unsupported payment gateway type: ${type}`);
    }
  }

  static getGatewayConfig(type: PaymentGatewayType): PaymentConfig {
    switch (type) {
      case 'jazzcash':
        return {
          merchantId: process.env.JAZZCASH_MERCHANT_ID || '',
          apiKey: process.env.JAZZCASH_PASSWORD || '',
          secret: process.env.JAZZCASH_API_SECRET || '',
        };
      case 'easypaisa':
        return {
          merchantId: process.env.EASYPAISA_MERCHANT_ID || '',
          apiKey: process.env.EASYPAISA_PASSWORD || '',
          secret: process.env.EASYPAISA_API_SECRET || '',
        };
      case 'bank-transfer':
        return {
          bankName: process.env.BANK_NAME || '',
          accountNumber: process.env.BANK_ACCOUNT_NUMBER || '',
          accountTitle: process.env.BANK_ACCOUNT_TITLE || '',
          iban: process.env.BANK_IBAN || '',
        };
      default:
        throw new Error(`Unsupported payment gateway type: ${type}`);
    }
  }
}