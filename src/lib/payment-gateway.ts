/**
 * Payment Gateway Module
 * Handles different payment methods: COD, JazzCash, EasyPaisa, Card
 */

export interface PaymentDetails {
  method: 'cod' | 'jazzcash' | 'easypaisa' | 'card';
  amount: number;
  transactionId?: string;
  accountNumber?: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
}

export const paymentProcessor = {
  async processPayment(
    method: 'cod' | 'jazzcash' | 'easypaisa' | 'card',
    paymentRequest: any
  ): Promise<PaymentResult> {
    try {
      if (method === 'cod') {
        return await this.processCOD(paymentRequest.orderId, paymentRequest.amount);
      } else if (method === 'jazzcash') {
        return await this.processJazzCash(paymentRequest);
      } else if (method === 'easypaisa') {
        return await this.processEasyPaisa(paymentRequest);
      } else if (method === 'card') {
        return await this.processCard(paymentRequest);
      }
      return { success: false, error: 'Unknown payment method' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Payment failed' };
    }
  },

  async processCOD(orderId: string, amount: number): Promise<PaymentResult> {
    // COD doesn't require any payment processing
    return {
      success: true,
      transactionId: `COD-${orderId}`,
    };
  },

  async processJazzCash(paymentRequest: any): Promise<PaymentResult> {
    // In a real app, this would integrate with JazzCash API
    // For now, we'll mock the response
    return {
      success: true,
      transactionId: `JC-${Date.now()}`,
    };
  },

  async processEasyPaisa(paymentRequest: any): Promise<PaymentResult> {
    // In a real app, this would integrate with EasyPaisa API
    // For now, we'll mock the response
    return {
      success: true,
      transactionId: `EP-${Date.now()}`,
    };
  },

  async processCard(paymentRequest: any): Promise<PaymentResult> {
    // In a real app, this would integrate with a payment gateway like Stripe
    // For now, we'll mock the response
    // In production, this would return a paymentUrl for redirect to payment gateway
    return {
      success: true,
      transactionId: `CC-${Date.now()}`,
    };
  },
};

export function validateJazzCashRequest(paymentDetails: any): string[] {
  const errors: string[] = [];

  if (!paymentDetails.accountNumber || paymentDetails.accountNumber.trim().length === 0) {
    errors.push('JazzCash account number is required');
  }

  if (!paymentDetails.transactionId || paymentDetails.transactionId.trim().length === 0) {
    errors.push('JazzCash transaction ID is required');
  }

  // Validate Pakistani mobile number for JazzCash (typically 11 digits starting with 03)
  if (paymentDetails.accountNumber && !/^03\d{9}$/.test(paymentDetails.accountNumber.replace(/\D/g, ''))) {
    errors.push('Please enter a valid JazzCash account number');
  }

  return errors;
}

export function validateEasyPaisaRequest(paymentDetails: any): string[] {
  const errors: string[] = [];

  if (!paymentDetails.accountNumber || paymentDetails.accountNumber.trim().length === 0) {
    errors.push('EasyPaisa account number is required');
  }

  if (!paymentDetails.transactionId || paymentDetails.transactionId.trim().length === 0) {
    errors.push('EasyPaisa transaction ID is required');
  }

  // Validate Pakistani mobile number for EasyPaisa
  if (paymentDetails.accountNumber && !/^03\d{9}$/.test(paymentDetails.accountNumber.replace(/\D/g, ''))) {
    errors.push('Please enter a valid EasyPaisa account number');
  }

  return errors;
}

export function validateCardRequest(paymentDetails: any): string[] {
  const errors: string[] = [];

  if (!paymentDetails.cardNumber || paymentDetails.cardNumber.trim().length === 0) {
    errors.push('Card number is required');
  } else {
    // Basic Luhn algorithm validation
    const cardNumber = paymentDetails.cardNumber.replace(/\D/g, '');
    if (!/^\d{13,19}$/.test(cardNumber)) {
      errors.push('Please enter a valid card number');
    }
  }

  if (!paymentDetails.cardHolder || paymentDetails.cardHolder.trim().length === 0) {
    errors.push('Cardholder name is required');
  }

  if (!paymentDetails.expiryDate || paymentDetails.expiryDate.trim().length === 0) {
    errors.push('Card expiry date is required');
  } else {
    // Validate MM/YY format
    if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      errors.push('Please enter expiry date in MM/YY format');
    }
  }

  if (!paymentDetails.cvv || paymentDetails.cvv.trim().length === 0) {
    errors.push('CVV is required');
  } else if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
    errors.push('Please enter a valid CVV');
  }

  return errors;
}

export function validatePaymentDetails(
  method: 'cod' | 'jazzcash' | 'easypaisa' | 'card',
  paymentDetails: any
): string[] {
  if (method === 'jazzcash') {
    return validateJazzCashRequest(paymentDetails);
  } else if (method === 'easypaisa') {
    return validateEasyPaisaRequest(paymentDetails);
  } else if (method === 'card') {
    return validateCardRequest(paymentDetails);
  }
  return [];
}
