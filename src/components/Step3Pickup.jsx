import React, { useState } from 'react';
import { Map, List, MapPin, Store, CheckCircle, Navigation as NavIcon } from 'lucide-react';
import { mockPickupPoints } from '../data/mockData';

export default function Step3Pickup({ onNext, selectedPoint, setSelectedPoint }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  const handleSelect = (point) => {
    setSelectedPoint(point);
  };

  return (
    <div className="card h-[600px] flex flex-col md:flex-row overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Mobile View Toggle */}
      <div className="md:hidden flex border-b border-slate-100 bg-white z-10">
        <button 
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${viewMode === 'list' ? 'text-primary border-b-2 border-primary' : 'text-slate-500'}`}
          onClick={() => setViewMode('list')}
        >
          <List className="w-4 h-4" /> List View
        </button>
        <button 
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${viewMode === 'map' ? 'text-primary border-b-2 border-primary' : 'text-slate-500'}`}
          onClick={() => setViewMode('map')}
        >
          <Map className="w-4 h-4" /> Map View
        </button>
      </div>

      {/* List Section */}
      <div className={`w-full md:w-5/12 lg:w-1/3 bg-white flex flex-col border-r border-slate-100 ${viewMode === 'map' ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-slate-800">Select Pickup Point</h2>
          <p className="text-xs text-slate-500 mt-1">4 available near your address</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {mockPickupPoints.map((point) => (
            <div 
              key={point.id}
              onClick={() => handleSelect(point)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedPoint?.id === point.id ? 'border-secondary bg-teal-50 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${point.type === 'Locker' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                    {point.type === 'Locker' ? <Store className="w-4 h-4" /> : <Store className="w-4 h-4" />}
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">{point.name}</span>
                </div>
                {selectedPoint?.id === point.id && <CheckCircle className="w-5 h-5 text-secondary" />}
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                <MapPin className="w-3 h-3" /> {point.address}
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{point.status}</span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1"><NavIcon className="w-3 h-3"/> {point.distance}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
          <button 
            className={`w-full py-3 rounded-xl font-medium transition-all ${selectedPoint ? 'btn-secondary' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
            onClick={onNext}
            disabled={!selectedPoint}
          >
            {selectedPoint ? 'Confirm Selection' : 'Select a point to continue'}
          </button>
        </div>
      </div>

      {/* Map Section (Simulated) */}
      <div className={`w-full md:w-7/12 lg:w-2/3 bg-blue-50 relative ${viewMode === 'list' ? 'hidden md:block' : 'block'}`}>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Mock Map UI */}
        <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md z-10 flex flex-col gap-2">
           <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-500 text-lg">+</div>
           <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-500 text-lg">-</div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative w-full h-full max-w-lg max-h-lg">
                {/* Simulated Map Markers based on data */}
                <div className="absolute top-[30%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="bg-primary text-white p-2 rounded-full shadow-lg relative z-10">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div className="bg-white px-2 py-1 rounded shadow text-xs font-bold mt-1 absolute top-full whitespace-nowrap z-20">Your Address</div>
                </div>

                {mockPickupPoints.map((point, index) => {
                    // Just pseudo-random positions for the mock map
                    const positions = [
                        { top: '20%', left: '60%' },
                        { top: '50%', left: '70%' },
                        { top: '65%', left: '30%' },
                        { top: '80%', left: '50%' }
                    ];
                    const pos = positions[index % positions.length];
                    const isSelected = selectedPoint?.id === point.id;

                    return (
                        <div 
                            key={`map-${point.id}`} 
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
                            style={pos}
                            onClick={() => handleSelect(point)}
                        >
                            <div className={`p-2 rounded-full shadow-lg border-2 ${isSelected ? 'bg-secondary border-white text-white z-30 scale-125' : 'bg-white border-slate-300 text-slate-600 z-10'}`}>
                                <Store className={`w-5 h-5 ${isSelected ? 'animate-pulse' : ''}`} />
                            </div>
                            {isSelected && (
                                <div className="bg-slate-800 text-white px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold mt-2 absolute top-full whitespace-nowrap z-40 flex flex-col items-center">
                                    <span>{point.name}</span>
                                    <span className="text-slate-300 font-normal">{point.distance}</span>
                                    <div className="w-2 h-2 bg-slate-800 rotate-45 absolute -top-1"></div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
      </div>
    </div>
  );
}
