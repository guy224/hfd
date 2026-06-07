import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, User, Phone, CheckCircle2, Copy, X, Link as LinkIcon, ExternalLink, Box, LayoutDashboard, Search } from 'lucide-react';
import { STATUSES } from '../data/sharedData';

export default function Admin({ shipments, setShipments }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [createdShipmentUrl, setCreatedShipmentUrl] = useState('');
  const [createdTrackingNumber, setCreatedTrackingNumber] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleCreateShipment = (e) => {
    e.preventDefault();

    // Generate random 6 digit tracking number to match HFD-100200 format
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = `HFD-${randomDigits}`;

    const phoneLast4 = customerPhone.replace(/\D/g, '').slice(-4);

    const newShipment = {
      id: Date.now().toString(),
      trackingNumber,
      customerName,
      phoneLast4,
      status: 'Order Confirmed',
      price: '29.00'
    };

    setShipments([newShipment, ...shipments]);
    
    // Generate Shareable URL
    const url = `${window.location.origin}/portal?track=${trackingNumber}`;
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
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-blue-900/50">
          <div className="font-black text-2xl tracking-tighter italic">HFD</div>
          <div className="text-blue-300 text-xs mt-1">Admin Operations</div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-800/50 text-white rounded-xl font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <Link to="/portal" className="flex items-center gap-3 px-4 py-3 text-blue-200 hover:bg-blue-800/30 rounded-xl font-medium transition-colors">
            <ExternalLink className="w-5 h-5" /> View Portal
          </Link>
        </nav>
        <div className="p-4 border-t border-blue-900/50">
           <div className="text-xs text-blue-400">System v2.0 &bull; Logged in as Admin</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        
        {/* Modal Overlay */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
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
                 <p className="text-blue-200 text-sm">A new tracking link is ready.</p>
              </div>
              
              <div className="p-6">
                 <div className="mb-6 text-center">
                   <p className="text-sm text-slate-500 mb-1">Tracking Number</p>
                   <p className="font-mono text-2xl font-bold text-slate-800 tracking-wider bg-slate-50 py-2 rounded-lg border border-slate-100">{createdTrackingNumber}</p>
                 </div>

                 <div className="mb-6">
                   <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5"><LinkIcon className="w-4 h-4"/> Shareable Link</p>
                   <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 overflow-hidden group hover:border-blue-300 transition-colors">
                     <div className="overflow-x-auto whitespace-nowrap text-sm text-slate-600 font-mono flex-1 no-scrollbar pb-1">
                       {createdShipmentUrl}
                     </div>
                   </div>
                 </div>

                 <button 
                   onClick={handleCopyLink}
                   className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${isCopied ? 'bg-green-500 text-white' : 'btn-primary'}`}
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

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Shipments Overview</h1>
          <p className="text-slate-500">Manage incoming and outgoing packages.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Create Form */}
          <div className="xl:col-span-1">
            <div className="card p-6 bg-white shadow-md sticky top-8">
              <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
                <Box className="w-5 h-5 text-primary" /> Create Shipment
              </h2>
              
              <form onSubmit={handleCreateShipment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Client Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      className="input-field pl-10"
                      placeholder="e.g. John Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      className="input-field pl-10"
                      placeholder="e.g. 050-1234567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full mt-4 flex justify-center items-center gap-2">
                  <Package className="w-4 h-4" /> Generate Shipment
                </button>
              </form>
            </div>
          </div>

          {/* Management Table */}
          <div className="xl:col-span-2">
            <div className="card bg-white shadow-md overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h2 className="text-lg font-bold text-slate-800">Active Shipments</h2>
                 <div className="relative">
                   <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                   <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                 </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4 font-semibold">Tracking #</th>
                      <th className="px-6 py-4 font-semibold">Client Name</th>
                      <th className="px-6 py-4 font-semibold text-center">Phone (Last 4)</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {shipments.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="p-8 text-center text-slate-400">
                          No active shipments found.
                        </td>
                      </tr>
                    ) : (
                      shipments.map((shipment) => (
                        <tr key={shipment.id} className="hover:bg-blue-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-mono font-bold text-primary bg-slate-100 px-2 py-1 rounded">
                              {shipment.trackingNumber}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-800">
                            {shipment.customerName}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 text-center font-mono">
                            {shipment.phoneLast4}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <select
                              value={shipment.status}
                              onChange={(e) => handleStatusChange(shipment.id, e.target.value)}
                              className="bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm font-medium shadow-sm w-full max-w-[160px]"
                            >
                              {STATUSES.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
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
      </main>
    </div>
  );
}
