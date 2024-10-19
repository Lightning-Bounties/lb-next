// src/ln-service.d.ts
declare module "ln-service" {
  interface DecodedInvoice {
    tokens: number;
    expires_at: string;
    description: string;
    // Add other fields as necessary
  }

  export function decodePaymentRequest(options: {
    request: string;
  }): Promise<DecodedInvoice>;
  // Add other function declarations as needed
}
