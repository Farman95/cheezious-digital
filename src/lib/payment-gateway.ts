// Payment Gateway Integration for Pakistani Market

export interface PaymentRequest {
  amount: number
  currency: string
  orderId: string
  customerEmail: string
  customerName: string
  customerPhone: string
  description?: string
  returnUrl?: string
  cancelUrl?: string
}

export interface PaymentResponse {
  success: boolean
  transactionId?: string
  paymentUrl?: string
  error?: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
}

export interface JazzCashPaymentRequest extends PaymentRequest {
  mobileAccount: string
  cnic?: string
}

export interface EasyPaisaPaymentRequest extends PaymentRequest {
  mobileAccount: string
  email?: string
}

export interface CardPaymentRequest extends PaymentRequest {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  cardholderName: string
  billingAddress?: {
    street: string
    city: string
    postalCode: string
    country: string
  }
}

// JazzCash Integration
export class JazzCashGateway {
  private baseUrl: string
  private merchantId: string
  private password: string
  private integritySalt: string

  constructor() {
    this.baseUrl = process.env.JAZZCASH_BASE_URL || 'https://sandbox.jazzcash.com.pk'
    this.merchantId = process.env.JAZZCASH_MERCHANT_ID || ''
    this.password = process.env.JAZZCASH_PASSWORD || ''
    this.integritySalt = process.env.JAZZCASH_INTEGRITY_SALT || ''
  }

  async createPayment(request: JazzCashPaymentRequest): Promise<PaymentResponse> {
    try {
      const timestamp = Math.floor(Date.now() / 1000).toString()
      const transactionId = `JC${Date.now()}`
      
      const paymentData = {
        pp_MerchantID: this.merchantId,
        pp_Password: this.password,
        pp_TxnRefNo: transactionId,
        pp_TxnDateTime: timestamp,
        pp_TxnAmount: request.amount.toFixed(2),
        pp_TxnCurrency: request.currency,
        pp_TxnType: 'MWALLET',
        pp_TxnExpiryDateTime: new Date(Date.now() + 30 * 60000).toISOString().replace(/[-:T.Z]/g, ''),
        pp_BillReference: request.orderId,
        pp_Description: request.description || `Order ${request.orderId}`,
        pp_MobileNumber: request.mobileAccount,
        pp_CNIC: request.cnic || '',
        pp_Email: request.customerEmail,
        pp_CustomerName: request.customerName,
        pp_CustomerMobile: request.customerPhone,
        pp_ReturnURL: request.returnUrl || `${process.env.NEXTAUTH_URL}/payment/jazzcash/return`,
        pp_CancelURL: request.cancelUrl || `${process.env.NEXTAUTH_URL}/payment/jazzcash/cancel`,
        pp_SecureHash: this.generateSecureHash(request.amount, transactionId, timestamp)
      }

      const response = await fetch(`${this.baseUrl}/CheckoutAPI`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      })

      const result = await response.json()

      if (result.pp_ResponseCode === '000') {
        return {
          success: true,
          transactionId,
          paymentUrl: result.pp_RedirectURL,
          status: 'pending'
        }
      } else {
        return {
          success: false,
          error: result.pp_ResponseMessage || 'Payment initialization failed',
          status: 'failed'
        }
      }
    } catch (error) {
      console.error('JazzCash payment error:', error)
      return {
        success: false,
        error: 'Payment service unavailable',
        status: 'failed'
      }
    }
  }

  async verifyPayment(transactionId: string): Promise<PaymentResponse> {
    try {
      const timestamp = Math.floor(Date.now() / 1000).toString()
      
      const verificationData = {
        pp_MerchantID: this.merchantId,
        pp_Password: this.password,
        pp_TxnRefNo: transactionId,
        pp_TxnDateTime: timestamp,
        pp_SecureHash: this.generateVerificationHash(transactionId, timestamp)
      }

      const response = await fetch(`${this.baseUrl}/InquiryAPI`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData)
      })

      const result = await response.json()

      if (result.pp_ResponseCode === '000') {
        return {
          success: true,
          transactionId,
          status: result.pp_TxnStatus === 'SUCCESS' ? 'completed' : 'processing'
        }
      } else {
        return {
          success: false,
          error: result.pp_ResponseMessage || 'Payment verification failed',
          status: 'failed'
        }
      }
    } catch (error) {
      console.error('JazzCash verification error:', error)
      return {
        success: false,
        error: 'Verification service unavailable',
        status: 'failed'
      }
    }
  }

  private generateSecureHash(amount: number, transactionId: string, timestamp: string): string {
    const hashString = `${this.integritySalt}&${this.merchantId}&${this.password}&${transactionId}&${timestamp}&${amount.toFixed(2)}&PKR&MWALLET&${new Date(Date.now() + 30 * 60000).toISOString().replace(/[-:T.Z]/g, '')}&${this.merchantId}&${this.password}&${transactionId}&${timestamp}&${amount.toFixed(2)}&PKR&MWALLET`
    // In production, use proper HMAC-SHA256
    return btoa(hashString)
  }

  private generateVerificationHash(transactionId: string, timestamp: string): string {
    const hashString = `${this.integritySalt}&${this.merchantId}&${this.password}&${transactionId}&${timestamp}`
    return btoa(hashString)
  }
}

// EasyPaisa Integration
export class EasyPaisaGateway {
  private baseUrl: string
  private merchantId: string
  private password: string
  private storeId: string

  constructor() {
    this.baseUrl = process.env.EASYPAYSA_BASE_URL || 'https://sandbox.easypaisa.com.pk'
    this.merchantId = process.env.EASYPAYSA_MERCHANT_ID || ''
    this.password = process.env.EASYPAYSA_PASSWORD || ''
    this.storeId = process.env.EASYPAYSA_STORE_ID || ''
  }

  async createPayment(request: EasyPaisaPaymentRequest): Promise<PaymentResponse> {
    try {
      const transactionId = `EP${Date.now()}`
      
      const paymentData = {
        merchantId: this.merchantId,
        storeId: this.storeId,
        transactionId,
        amount: request.amount,
        currency: request.currency,
        customerEmail: request.customerEmail,
        customerName: request.customerName,
        customerMobile: request.customerPhone,
        mobileAccount: request.mobileAccount,
        description: request.description || `Order ${request.orderId}`,
        orderId: request.orderId,
        returnUrl: request.returnUrl || `${process.env.NEXTAUTH_URL}/payment/easypaisa/return`,
        cancelUrl: request.cancelUrl || `${process.env.NEXTAUTH_URL}/payment/easypaisa/cancel`
      }

      const response = await fetch(`${this.baseUrl}/api/v2/payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${this.merchantId}:${this.password}`)}`
        },
        body: JSON.stringify(paymentData)
      })

      const result = await response.json()

      if (result.success) {
        return {
          success: true,
          transactionId,
          paymentUrl: result.paymentUrl,
          status: 'pending'
        }
      } else {
        return {
          success: false,
          error: result.message || 'Payment initialization failed',
          status: 'failed'
        }
      }
    } catch (error) {
      console.error('EasyPaisa payment error:', error)
      return {
        success: false,
        error: 'Payment service unavailable',
        status: 'failed'
      }
    }
  }

  async verifyPayment(transactionId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v2/payment/verify/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${this.merchantId}:${this.password}`)}`
        }
      })

      const result = await response.json()

      if (result.success) {
        return {
          success: true,
          transactionId,
          status: result.status === 'SUCCESS' ? 'completed' : 'processing'
        }
      } else {
        return {
          success: false,
          error: result.message || 'Payment verification failed',
          status: 'failed'
        }
      }
    } catch (error) {
      console.error('EasyPaisa verification error:', error)
      return {
        success: false,
        error: 'Verification service unavailable',
        status: 'failed'
      }
    }
  }
}

// Card Payment Integration (Stripe-like)
export class CardPaymentGateway {
  private baseUrl: string
  private secretKey: string

  constructor() {
    this.baseUrl = process.env.CARD_PAYMENT_BASE_URL || 'https://api.stripe.com/v1'
    this.secretKey = process.env.CARD_PAYMENT_SECRET_KEY || ''
  }

  async createPayment(request: CardPaymentRequest): Promise<PaymentResponse> {
    try {
      // Create payment intent
      const paymentIntentData = {
        amount: Math.round(request.amount * 100), // Convert to cents
        currency: request.currency.toLowerCase(),
        metadata: {
          orderId: request.orderId,
          customerEmail: request.customerEmail,
          customerName: request.customerName
        },
        receipt_email: request.customerEmail
      }

      const response = await fetch(`${this.baseUrl}/payment_intents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentIntentData)
      })

      const result = await response.json()

      if (result.id) {
        // Confirm payment with card details
        const confirmResponse = await fetch(`${this.baseUrl}/payment_intents/${result.id}/confirm`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            payment_method: {
              type: 'card',
              card: {
                number: request.cardNumber,
                exp_month: request.expiryMonth,
                exp_year: request.expiryYear,
                cvc: request.cvv
              },
              billing_details: {
                name: request.cardholderName,
                email: request.customerEmail,
                phone: request.customerPhone,
                address: request.billingAddress ? {
                  line1: request.billingAddress.street,
                  city: request.billingAddress.city,
                  postal_code: request.billingAddress.postalCode,
                  country: request.billingAddress.country
                } : undefined
              }
            }
          })
        })

        const confirmResult = await confirmResponse.json()

        if (confirmResult.status === 'succeeded') {
          return {
            success: true,
            transactionId: result.id,
            status: 'completed'
          }
        } else {
          return {
            success: false,
            error: confirmResult.error?.message || 'Payment failed',
            status: 'failed'
          }
        }
      } else {
        return {
          success: false,
          error: result.error?.message || 'Payment initialization failed',
          status: 'failed'
        }
      }
    } catch (error) {
      console.error('Card payment error:', error)
      return {
        success: false,
        error: 'Payment service unavailable',
        status: 'failed'
      }
    }
  }

  async verifyPayment(transactionId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payment_intents/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`
        }
      })

      const result = await response.json()

      if (result.status === 'succeeded') {
        return {
          success: true,
          transactionId,
          status: 'completed'
        }
      } else if (result.status === 'processing') {
        return {
          success: true,
          transactionId,
          status: 'processing'
        }
      } else {
        return {
          success: false,
          error: 'Payment not completed',
          status: 'failed'
        }
      }
    } catch (error) {
      console.error('Card payment verification error:', error)
      return {
        success: false,
        error: 'Verification service unavailable',
        status: 'failed'
      }
    }
  }
}

// Unified Payment Processor
export class PaymentProcessor {
  private jazzCash: JazzCashGateway
  private easyPaisa: EasyPaisaGateway
  private cardPayment: CardPaymentGateway

  constructor() {
    this.jazzCash = new JazzCashGateway()
    this.easyPaisa = new EasyPaisaGateway()
    this.cardPayment = new CardPaymentGateway()
  }

  async processPayment(
    method: 'jazzcash' | 'easypaisa' | 'card',
    request: PaymentRequest | JazzCashPaymentRequest | EasyPaisaPaymentRequest | CardPaymentRequest
  ): Promise<PaymentResponse> {
    switch (method) {
      case 'jazzcash':
        return this.jazzCash.createPayment(request as JazzCashPaymentRequest)
      case 'easypaisa':
        return this.easyPaisa.createPayment(request as EasyPaisaPaymentRequest)
      case 'card':
        return this.cardPayment.createPayment(request as CardPaymentRequest)
      default:
        return {
          success: false,
          error: 'Unsupported payment method',
          status: 'failed'
        }
    }
  }

  async verifyPayment(method: 'jazzcash' | 'easypaisa' | 'card', transactionId: string): Promise<PaymentResponse> {
    switch (method) {
      case 'jazzcash':
        return this.jazzCash.verifyPayment(transactionId)
      case 'easypaisa':
        return this.easyPaisa.verifyPayment(transactionId)
      case 'card':
        return this.cardPayment.verifyPayment(transactionId)
      default:
        return {
          success: false,
          error: 'Unsupported payment method',
          status: 'failed'
        }
    }
  }

  async refundPayment(method: 'jazzcash' | 'easypaisa' | 'card', transactionId: string, amount?: number): Promise<PaymentResponse> {
    try {
      // Implement refund logic based on payment provider
      // This is a simplified version - actual implementation would vary by provider
      const response = await fetch(`/api/payments/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          method,
          transactionId,
          amount
        })
      })

      const result = await response.json()

      return {
        success: result.success,
        transactionId: result.refundId,
        status: result.success ? 'completed' : 'failed',
        error: result.error
      }
    } catch (error) {
      console.error('Refund error:', error)
      return {
        success: false,
        error: 'Refund service unavailable',
        status: 'failed'
      }
    }
  }
}

// Export singleton instance
export const paymentProcessor = new PaymentProcessor()

// Payment validation utilities
export function validateJazzCashRequest(request: JazzCashPaymentRequest): string[] {
  const errors: string[] = []
  
  if (!request.mobileAccount || !/^03[0-9]{9}$/.test(request.mobileAccount)) {
    errors.push('Valid JazzCash mobile number is required')
  }
  
  if (request.cnic && !/^[0-9]{13}$/.test(request.cnic)) {
    errors.push('Valid CNIC is required (13 digits without dashes)')
  }
  
  return errors
}

export function validateEasyPaisaRequest(request: EasyPaisaPaymentRequest): string[] {
  const errors: string[] = []
  
  if (!request.mobileAccount || !/^03[0-9]{9}$/.test(request.mobileAccount)) {
    errors.push('Valid EasyPaisa mobile number is required')
  }
  
  return errors
}

export function validateCardRequest(request: CardPaymentRequest): string[] {
  const errors: string[] = []
  
  if (!request.cardNumber || !/^[0-9]{16}$/.test(request.cardNumber.replace(/\s/g, ''))) {
    errors.push('Valid 16-digit card number is required')
  }
  
  if (!request.expiryMonth || !request.expiryYear) {
    errors.push('Card expiry date is required')
  }
  
  if (!request.cvv || !/^[0-9]{3,4}$/.test(request.cvv)) {
    errors.push('Valid CVV is required')
  }
  
  if (!request.cardholderName) {
    errors.push('Cardholder name is required')
  }
  
  return errors
}

// Payment webhook handlers
export async function handleJazzCashWebhook(payload: any): Promise<void> {
  try {
    const { pp_TxnRefNo, pp_ResponseCode, pp_ResponseMessage, pp_TxnStatus } = payload
    
    const status = pp_ResponseCode === '000' && pp_TxnStatus === 'SUCCESS' ? 'completed' : 'failed'
    
    // Update order status in database
    await updateOrderPaymentStatus(pp_TxnRefNo, status, payload)
  } catch (error) {
    console.error('JazzCash webhook error:', error)
  }
}

export async function handleEasyPaisaWebhook(payload: any): Promise<void> {
  try {
    const { transactionId, status, orderId } = payload
    
    const paymentStatus = status === 'SUCCESS' ? 'completed' : 'failed'
    
    // Update order status in database
    await updateOrderPaymentStatus(transactionId, paymentStatus, payload)
  } catch (error) {
    console.error('EasyPaisa webhook error:', error)
  }
}

export async function handleCardPaymentWebhook(payload: any): Promise<void> {
  try {
    const { id, status, metadata } = payload
    
    const paymentStatus = status === 'succeeded' ? 'completed' : 'failed'
    
    // Update order status in database
    await updateOrderPaymentStatus(id, paymentStatus, payload)
  } catch (error) {
    console.error('Card payment webhook error:', error)
  }
}

// Helper function to update order payment status
async function updateOrderPaymentStatus(transactionId: string, status: string, payload: any): Promise<void> {
  // This would integrate with your database service
  console.log(`Updating payment status for transaction ${transactionId} to ${status}`, payload)
}
