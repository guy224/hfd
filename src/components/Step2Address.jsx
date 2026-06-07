import React, { useState } from 'react';
import { MapPin, User, CheckCircle2 } from 'lucide-react';
import { mockCustomerData } from '../data/mockData';

export default function Step2Address({ onNext, activeShipment }) {
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && street && houseNumber) {
      onNext();
    }
  };

  const customerName = activeShipment ? activeShipment.customerName : mockCustomerData.name;

  return (
    <div className="card p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-500 max-w-xl mx-auto">
      <div className="mb-6 pb-6 border-b border-slate-100 flex items-center gap-4">
        <div className="bg-slate-100 p-3 rounded-full">
          <User className="w-6 h-6 text-slate-600" />
        </div>
        <div>
          <p className="text-sm text-slate-500">Verified Customer</p>
          <p className="font-semibold text-lg text-slate-800">{customerName}</p>
        </div>
        <CheckCircle2 className="w-6 h-6 text-green-500 ml-auto" />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-1">Confirm Delivery Address</h2>
        <p className="text-slate-500 text-sm">Where should we look for nearby pickup points?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="input-field pl-9"
              placeholder="e.g. Tel Aviv"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-slate-700 mb-1">Street</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Dizengoff"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium text-slate-700 mb-1">House No.</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. 50"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full mt-6">
          Find Pickup Points
        </button>
      </form>
    </div>
  );
}
