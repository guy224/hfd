import React, { useState } from 'react';
import { CreditCard, Lock, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

export default function Step4Checkout({ onNext, selectedPoint }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onNext();
    }, 1500);
  };

  return (
    <div className="card p-0 md:p-0 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col md:flex-row">
      
      {/* Order Summary */}
      <div className="w-full md:w-5/12 bg-slate-50 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -z-0"></div>
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 relative z-10">Delivery To</p>
          <div className="flex gap-3 relative z-10">
            <div className="mt-1 bg-teal-50 p-2 rounded-full h-min">
                <MapPin className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="font-bold text-slate-800">{selectedPoint?.name || 'Pickup Point'}</p>
              <p className="text-sm text-slate-500 mt-0.5">{selectedPoint?.address || 'Address not selected'}</p>
              <div className="flex items-center gap-1 mt-2 text-xs font-medium text-green-600 bg-green-50 w-max px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3" /> Selected
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Shipment Handling</span>
            <span>Included</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Locker / Shop Fee</span>
            <span>29.00 ILS</span>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-200 flex justify-between items-end">
            <div>
              <span className="text-slate-500 text-xs block mb-1">Total to pay</span>
              <span className="text-2xl font-black text-slate-800">29.00 <span className="text-lg text-slate-500 font-semibold">ILS</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="w-full md:w-7/12 p-6 md:p-8 bg-white">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-1">Secure Payment</h2>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            <Lock className="w-3 h-3" /> 256-bit SSL encrypted
          </p>
        </div>

        {/* Quick Pay */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm font-semibold text-slate-800">
             <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-4 h-4" /> Pay
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm font-semibold text-slate-800">
             <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-4 h-4" /> Pay
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-xs text-slate-400 font-medium uppercase absolute">Or pay with card</span>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cardholder Name</label>
            <input type="text" className="input-field" placeholder="Israel Israeli" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <CreditCard className="h-5 w-5 text-slate-400" />
              </div>
              <input type="text" className="input-field" placeholder="0000 0000 0000 0000" maxLength="19" required />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
              <input type="text" className="input-field" placeholder="MM/YY" maxLength="5" required />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">CVV</label>
              <input type="text" className="input-field" placeholder="123" maxLength="4" required />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary w-full mt-6 relative"
            disabled={isProcessing}
          >
            {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                </span>
            ) : (
                <span className="flex items-center justify-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Pay 29.00 ILS
                </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
