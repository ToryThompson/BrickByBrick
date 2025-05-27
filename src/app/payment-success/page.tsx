'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function PaymentSuccessContent() {
  const [status, setStatus] = useState<'processing' | 'succeeded' | 'failed'>('processing');
  const searchParams = useSearchParams();

  useEffect(() => {
    const payment_intent = searchParams.get('payment_intent');
    const payment_intent_client_secret = searchParams.get('payment_intent_client_secret');

    if (payment_intent && payment_intent_client_secret) {
      // Here you would typically verify the payment status with your backend
      setStatus('succeeded');
    } else {
      setStatus('failed');
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {status === 'processing' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0055BF] mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold text-[#0055BF] mb-4">Processing Payment</h1>
              <p className="text-gray-600">Please wait while we confirm your payment...</p>
            </>
          )}

          {status === 'succeeded' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[#0055BF] mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-8">Thank you for your payment. We'll be in touch shortly with next steps.</p>
              <Link href="/" className="bg-[#0055BF] text-white px-6 py-3 rounded-lg hover:bg-[#004494] transition-colors">
                Return to Home
              </Link>
            </>
          )}

          {status === 'failed' && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[#0055BF] mb-4">Payment Failed</h1>
              <p className="text-gray-600 mb-8">There was an issue processing your payment. Please try again.</p>
              <Link href="/pricing" className="bg-[#0055BF] text-white px-6 py-3 rounded-lg hover:bg-[#004494] transition-colors">
                Try Again
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
} 