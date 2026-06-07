import React, { useState } from 'react';
import { Settings, PlusCircle, LayoutList, Package, User, Phone, CheckCircle2, Copy, X, Link as LinkIcon } from 'lucide-react';

export default function AdminDashboard({ shipments, setShipments }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [createdShipmentUrl, setCreatedShipmentUrl] = useState('');
  const [createdTrackingNumber, setCreatedTrackingNumber] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleCreateShipment = (e) => {
    e.preventDefault();

    // Generate random 8 digit tracking number
    const random8Digits = Math.floor(10000000 + Math.random() * 90000000);
    const trackingNumber = `HFD-${random8Digits}`;

    // Extract last 4 digits of phone
    const phoneLast4 = customerPhone.replace(/\D/g, '').slice(-4);

    const newShipment = {
      id: Date.now().toString(),
      trackingNumber,
      customerName,
      phoneLast4,
      status: 'Order Confirmed',
    };

    setShipments([...shipments, newShipment]);
    
    // Generate Shareable URL
    const url = `${window.location.origin}/?track=${trackingNumber}`;
    setCreatedTrackingNumber(trackingNumber);
    setCreatedShipmentUrl(url);
    setIsCopied(false);
    setShowModal(true);

    setCustomerName('');
    setCustomerPhone('');
  };

  const handleStatusChange = (id, newStatus) => {
    setShipments(shipments.map(s => 
      s.id === id ? { ...s, status: newStatus } : s
    ));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(createdShipmentUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-8 relative">
      
      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-primary p-6 text-white text-center relative">
               <button 
                 onClick={() => setShowModal(false)}
                 className="absolute top-4 right-4 text-slate-300 hover:text-white transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
               <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                 <CheckCircle2 className="w-8 h-8 text-green-400" />
               </div>
               <h3 className="text-xl font-bold mb-1">Shipment Created!</h3>
               <p className="text-blue-200 text-sm">A new tracking link is ready for your customer.</p>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
               <div className="mb-6 text-center">
                 <p className="text-sm text-slate-500 mb-1">Tracking Number</p>
                 <p className="font-mono text-2xl font-bold text-slate-800 tracking-wider bg-slate-50 py-2 rounded-lg border border-slate-100">{createdTrackingNumber}</p>
               </div>

               <div className="mb-6">
                 <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5"><LinkIcon className="w-4 h-4"/> Shareable Link</p>
                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 overflow-hidden group hover:border-secondary transition-colors">
                   <div className="overflow-x-auto whitespace-nowrap text-sm text-slate-600 font-mono flex-1 no-scrollbar pb-1">
                     {createdShipmentUrl}
                   </div>
                 </div>
               </div>

               <button 
                 onClick={handleCopyLink}
                 className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${isCopied ? 'bg-green-500 text-white' : 'btn-secondary'}`}
               >
                 {isCopied ? (
                   <><CheckCircle2 className="w-5 h-5" /> Copied!</>
                 ) : (
                   <><Copy className="w-5 h-5" /> Copy Link</>
                 )}
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="bg-primary p-2 rounded-lg text-white">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm">Manage logistics and active shipments</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Create Form */}
        <div className="w-full lg:w-1/3">
          <div className="card p-6 bg-white sticky top-24">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-primary" /> Create Shipment
            </h2>
            
            <form onSubmit={handleCreateShipment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Customer Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="input-field pl-9"
                    placeholder="e.g. Israel Israeli"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    className="input-field pl-9"
                    placeholder="e.g. 050-1234567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full mt-2 flex justify-center items-center gap-2">
                <Package className="w-4 h-4" /> Add Shipment
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Management Table */}
        <div className="w-full lg:w-2/3">
          <div className="card bg-white overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
               <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                 <LayoutList className="w-5 h-5 text-primary" /> Active Shipments
               </h2>
               <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                 {shipments.length} Total
               </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">Tracking #</th>
                    <th className="p-4 font-semibold">Customer</th>
                    <th className="p-4 font-semibold text-center">Phone (Last 4)</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {shipments.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-slate-400">
                        No active shipments. Create one to get started.
                      </td>
                    </tr>
                  ) : (
                    shipments.map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <span className="font-mono font-medium text-primary bg-blue-50 px-2 py-1 rounded">
                            {shipment.trackingNumber}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-medium text-slate-800">
                          {shipment.customerName}
                        </td>
                        <td className="p-4 text-sm text-slate-500 text-center font-mono">
                          {shipment.phoneLast4}
                        </td>
                        <td className="p-4 text-sm">
                          <select
                            value={shipment.status}
                            onChange={(e) => handleStatusChange(shipment.id, e.target.value)}
                            className="bg-white border border-slate-200 text-slate-700 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                          >
                            <option value="Order Confirmed">Order Confirmed</option>
                            <option value="At Sorting Center">At Sorting Center</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Ready for Pickup">Ready for Pickup</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
