import PaymentGateway from './PaymentGateway';
import { PaymentRequest, PaymentResponse } from './types';

export default class BankTransferGateway extends PaymentGateway {
  async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Bank transfer doesn't require API initiation
      // Return bank account details for manual transfer
      const bankDetails = {
        bankName: this.config.bankName || 'Bank Name',
        accountNumber: this.config.accountNumber || 'Account Number',
        accountTitle: this.config.accountTitle || 'Account Title',
        iban: this.config.iban || 'IBAN',
        amount: request.amount,
        currency: request.currency,
        orderId: request.orderId,
        instructions: 'Please transfer the amount to the following bank account and share the transaction reference.',
      };

      return {
        success: true,
        data: bankDetails,
        transactionId: request.orderId,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to generate bank transfer details',
      };
    }
  }

  async verifyPayment(transactionId: string): Promise<PaymentResponse> {
    // Bank transfers are verified manually by admin
    return {
      success: true,
      transactionId,
      data: {
        message: 'Bank transfer verification requires manual confirmation by admin',
      },
    };
  }

  async refundPayment(transactionId: string, amount?: number): Promise<PaymentResponse> {
    // Bank transfer refunds are processed manually
    return {
      success: true,
      transactionId,
      data: {
        message: 'Bank transfer refunds require manual processing',
      },
    };
  }
}