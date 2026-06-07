import React, { useEffect, useState } from 'react';
import { CheckCircle, Truck, Package, Store, MapPin, Copy } from 'lucide-react';
import { mockCustomerData } from '../data/mockData';

export default function Step5Success({ selectedPoint, activeShipment }) {
  const [progress, setProgress] = useState(0);

  const statusOrder = ['Order Confirmed', 'At Sorting Center', 'Out for Delivery', 'Ready for Pickup'];
  const currentStatus = activeShipment ? activeShipment.status : 'Order Confirmed';
  const currentStatusIndex = statusOrder.indexOf(currentStatus);
  
  // Calculate final progress percentage based on status
  // Index 0 -> 25%, Index 1 -> 50%, Index 2 -> 75%, Index 3 -> 100%
  const targetProgress = ((currentStatusIndex + 1) / statusOrder.length) * 100;

  // Simulate progress bar loading animation to the target progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(targetProgress);
    }, 500);
    return () => clearTimeout(timer);
  }, [targetProgress]);

  const pickupCode = "HFD-789-456";
  const trackingNumber = activeShipment ? activeShipment.trackingNumber : mockCustomerData.trackingNumber;

  return (
    <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-700">
      
      {/* Success Header */}
      <div className="text-center mb-10 mt-4">
        <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-75"></div>
            <div className="bg-green-500 text-white rounded-full p-4 relative z-10 shadow-xl shadow-green-500/30">
                <CheckCircle className="w-12 h-12" />
            </div>
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">Payment Successful!</h1>
        <p className="text-slate-500 text-lg">Your delivery to the pickup point is confirmed.</p>
      </div>

      <div className="card p-0 overflow-hidden mb-8 shadow-2xl">
        {/* Tracking Header */}
        <div className="bg-primary p-6 text-white">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-blue-200 text-sm mb-1 font-medium">Tracking Number</p>
                    <p className="font-mono text-xl font-bold tracking-wider">{trackingNumber}</p>
                </div>
                <div className="bg-blue-800/50 px-3 py-1 rounded-full border border-blue-700/50 text-xs font-semibold backdrop-blur-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div> {currentStatus}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative pt-2 pb-4">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-900/50">
                    <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400 transition-all duration-1000 ease-out"></div>
                </div>
                <div className="flex justify-between text-xs text-blue-200 font-medium px-1">
                    <span className={currentStatusIndex >= 0 ? "text-white font-bold" : ""}>Confirmed</span>
                    <span className={currentStatusIndex >= 1 ? "text-white font-bold" : ""}>Processing</span>
                    <span className={currentStatusIndex >= 2 ? "text-white font-bold" : ""}>Delivering</span>
                    <span className={currentStatusIndex >= 3 ? "text-white font-bold" : ""}>Ready</span>
                </div>
            </div>
        </div>

        {/* Pickup Code Section */}
        <div className="p-8 bg-white border-b border-slate-100 text-center">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Your Pickup Code</p>
            
            <div className="inline-block bg-slate-50 border-2 border-slate-200 border-dashed rounded-xl p-4 mb-4 relative group cursor-pointer hover:border-secondary transition-colors">
                <div className="font-mono text-4xl font-black text-slate-800 tracking-[0.2em]">{pickupCode}</div>
                <div className="absolute -right-3 -top-3 bg-white border border-slate-200 p-1.5 rounded-md shadow-sm text-slate-400 group-hover:text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy className="w-4 h-4" />
                </div>
            </div>
            
            {/* Mock Barcode */}
            <div className="flex justify-center h-16 w-full max-w-xs mx-auto space-x-1 opacity-80 mb-2">
                {[...Array(40)].map((_, i) => (
                    <div key={i} className="bg-slate-800 h-full" style={{ width: `${Math.random() * 4 + 1}px` }}></div>
                ))}
            </div>
            <p className="text-xs text-slate-400">Scan at the locker to retrieve your package</p>
        </div>

        {/* Destination Summary */}
        <div className="p-6 bg-slate-50 flex gap-4 items-center">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                <Store className="w-6 h-6 text-primary" />
            </div>
            <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Destination</p>
                <p className="font-bold text-slate-800">{selectedPoint?.name}</p>
                <p className="text-sm text-slate-600 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3"/> {selectedPoint?.address}</p>
            </div>
        </div>

      </div>

      <button className="btn-secondary w-full py-4 text-lg" onClick={() => window.location.reload()}>
          Track Another Shipment
      </button>

    </div>
  );
}
