import React, { useState, useEffect } from 'react';
import { Package, Smartphone } from 'lucide-react';

export default function Step1Verification({ onNext, shipments, setActiveShipment }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [phoneLast4, setPhoneLast4] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for '?track=' query parameter on mount
    const params = new URLSearchParams(window.location.search);
    const trackParam = params.get('track');
    if (trackParam) {
      setTrackingNumber(trackParam.toUpperCase());
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find the shipment in the active shipments array
    const foundShipment = shipments.find(
      (s) => s.trackingNumber.toUpperCase() === trackingNumber.toUpperCase() && s.phoneLast4 === phoneLast4
    );

    if (foundShipment) {
      setError('');
      setActiveShipment(foundShipment);
      onNext();
    } else {
      setError('Shipment not found. Please check your Tracking Number and Phone digits.');
    }
  };

  return (
    <div className="card p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto">
      <div className="text-center mb-8">
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Track Your Shipment</h2>
        <p className="text-slate-500">Enter your details to manage your delivery</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Shipment / Tracking Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Package className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="input-field pl-10"
              placeholder="e.g. HFD-837492"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Last 4 digits of Phone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Smartphone className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              maxLength="4"
              className="input-field pl-10"
              placeholder="e.g. 1234"
              value={phoneLast4}
              onChange={(e) => setPhoneLast4(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

        <button type="submit" className="btn-primary w-full mt-6">
          Track & Arrange Delivery
        </button>
      </form>
    </div>
  );
}
