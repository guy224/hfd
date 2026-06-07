import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { STATUSES, mockPickupPoints } from '../data/sharedData';

export default function Portal({ shipments }) {
  const [searchParams] = useSearchParams();
  const trackParam = searchParams.get('track');
  
  const [activeShipment, setActiveShipment] = useState(null);
  
  // State Machine
  const [step, setStep] = useState(1);

  // Form State
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');

  // Step 2 State
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');

  // Step 3 State
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Step 4 State
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (trackParam) {
      const found = shipments.find(s => s.trackingNumber.toUpperCase() === trackParam.toUpperCase());
      if (found) {
        setActiveShipment(found);
      }
    }
  }, [trackParam, shipments]);

  const displayShipment = activeShipment || shipments[0];

  if (!displayShipment) {
    return <div className="p-8 text-center font-bold text-black" dir="rtl">לא נמצאו חבילות.</div>;
  }

  const currentStatusIndex = STATUSES.indexOf(displayShipment.status);
  const progressPercent = ((currentStatusIndex + 1) / STATUSES.length) * 100;

  // Render Helpers
  const renderHeader = () => (
    <>
      <div className="bg-white flex justify-center items-center py-2 gap-2 border-b-2 border-black">
         <button className="bg-black text-white px-4 py-1 text-sm font-bold border-2 border-black">מעקב משלוחים</button>
         <button className="bg-[#ff0000] text-white px-4 py-1 text-sm font-bold border-2 border-[#ff0000]">להצעת מחיר &lt;&lt;</button>
      </div>
      <header className="bg-white border-b-4 border-black h-20 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex flex-col items-center">
           <div className="bg-black text-white text-[10px] px-1 font-bold border border-black">לוקרים אוטומטיים</div>
           <div className="bg-[#ff0000] text-white text-xs px-2 font-bold border border-black">e POST.</div>
        </div>
        <img src="https://www.hfd.co.il/wp-content/uploads/2021/02/logo-1.png" alt="HFD Logo" className="h-12" />
        <Menu className="w-10 h-10 text-black border-2 border-black p-1" />
      </header>
      
      {/* Banner matching screenshot */}
      <div 
        className="text-center relative overflow-hidden bg-cover bg-center h-48 border-b-4 border-black"
        style={{ backgroundImage: 'url("https://www.hfd.co.il/wp-content/uploads/2021/02/home_banner.jpg")' }}
      >
        <div className="absolute inset-0 bg-white/70"></div>
        <img src="https://www.hfd.co.il/wp-content/uploads/2021/02/logo-1.png" alt="HFD Logo" className="h-20 mx-auto mt-4 relative z-10" />
        <h1 className="text-2xl font-bold text-[#0056b3] mt-2 relative z-10 tracking-tight">שליחויות ולוגיסטיקה</h1>
      </div>
    </>
  );

  const renderOrderInfo = () => (
    <div className="p-4 border-t-2 border-black mt-4 bg-white">
       <h3 className="text-lg font-bold bg-black text-white p-2 text-center uppercase">יש לך חבילה בהמתנה!</h3>
       <div className="border-4 border-black p-4 mt-2 bg-gray-100">
         <p className="font-bold text-black text-lg mb-2">מספר מעקב: <span className="bg-yellow-300 px-2 py-1 border-2 border-black">{displayShipment.trackingNumber}</span></p>
         <p className="font-bold text-[#ff0000] text-xl border-t-4 border-black pt-2 mt-2">סכום לתשלום: {displayShipment.price || '29.00'} ₪</p>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#e6e2dd] font-sans" dir="rtl">
      
      {renderHeader()}

      <main className="max-w-md mx-auto bg-white border-x-4 border-black pb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        {renderOrderInfo()}

        {/* Step 1: Verification */}
        {step === 1 && (
          <div className="p-4 bg-gray-200 border-y-4 border-black mt-4">
            <h2 className="text-xl font-bold text-black mb-4 bg-white p-2 border-2 border-black inline-block">1. פרטים אישיים:</h2>
            
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div>
                <label className="block text-sm font-bold text-black mb-1">מספר תעודת זהות:</label>
                <input 
                  type="text" maxLength="9" className="input-field rounded-none border-2 border-black" 
                  value={idNumber} onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, ''))} required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1">מספר טלפון נייד:</label>
                <input 
                  type="tel" className="input-field rounded-none border-2 border-black" 
                  value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d-]/g, ''))} required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1">שם מלא:</label>
                <input 
                  type="text" className="input-field rounded-none border-2 border-black" 
                  value={fullName} onChange={(e) => setFullName(e.target.value)} required
                />
              </div>
              <button type="submit" disabled={!(idNumber.length===9 && phone.length>=9 && fullName.length>2)} className="w-full bg-[#0056b3] hover:bg-blue-800 text-white font-bold py-3 mt-4 border-4 border-black uppercase disabled:bg-gray-500 cursor-pointer">
                אישור והמשך לבחירת נקודה
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Address */}
        {step === 2 && (
          <div className="p-4 bg-gray-200 border-y-4 border-black mt-4">
            <h2 className="text-xl font-bold text-black mb-4 bg-white p-2 border-2 border-black inline-block">2. כתובת למשלוח:</h2>
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
              <div>
                <label className="block text-sm font-bold text-black mb-1">עיר:</label>
                <input type="text" className="input-field rounded-none border-2 border-black" value={city} onChange={(e)=>setCity(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1">רחוב:</label>
                <input type="text" className="input-field rounded-none border-2 border-black" value={street} onChange={(e)=>setStreet(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1">מספר בית:</label>
                <input type="text" className="input-field rounded-none border-2 border-black" value={house} onChange={(e)=>setHouse(e.target.value)} required />
              </div>
              <button type="submit" className="w-full bg-[#0056b3] hover:bg-blue-800 text-white font-bold py-3 mt-4 border-4 border-black uppercase cursor-pointer">
                חפש נקודות איסוף
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Pickup Points */}
        {step === 3 && (
          <div className="p-4 bg-gray-200 border-y-4 border-black mt-4">
            <h2 className="text-xl font-bold text-black mb-4 bg-white p-2 border-2 border-black inline-block">3. בחר נקודת איסוף:</h2>
            <div className="space-y-2 bg-white p-2 border-2 border-black max-h-64 overflow-y-auto">
              {mockPickupPoints.map((point) => (
                <div 
                  key={point.id} 
                  onClick={() => setSelectedPoint(point)}
                  className={`p-3 border-2 cursor-pointer ${selectedPoint?.id === point.id ? 'border-[#0056b3] bg-blue-100' : 'border-gray-400 bg-white hover:bg-gray-50'}`}
                >
                  <p className="font-bold text-black">{point.name}</p>
                  <p className="text-sm text-gray-700">{point.address}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setStep(4)} 
              disabled={!selectedPoint}
              className="w-full bg-[#ff0000] hover:bg-red-800 text-white font-bold py-3 mt-4 border-4 border-black uppercase disabled:bg-gray-500 cursor-pointer"
            >
              המשך לתשלום דמי משלוח
            </button>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div className="p-4 bg-gray-200 border-y-4 border-black mt-4">
            <h2 className="text-xl font-bold text-black mb-4 bg-white p-2 border-2 border-black inline-block">4. תשלום:</h2>
            <div className="bg-white border-2 border-black p-4 mb-4 text-center">
               <p className="font-bold">סכום: <span className="text-[#ff0000] text-xl">{displayShipment.price || '29.00'} ₪</span></p>
               <p className="text-sm text-gray-600">יעד: {selectedPoint?.name}</p>
            </div>
            <form className="space-y-3" onSubmit={(e) => { 
                e.preventDefault(); 
                setIsProcessing(true);
                setTimeout(() => { setIsProcessing(false); setStep(5); }, 1500);
            }}>
              <div>
                <label className="block text-sm font-bold text-black mb-1">שם על הכרטיס:</label>
                <input type="text" className="input-field rounded-none border-2 border-black" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1">מספר אשראי:</label>
                <input type="text" className="input-field rounded-none border-2 border-black" maxLength="16" required />
              </div>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-black mb-1">תוקף (MM/YY):</label>
                  <input type="text" className="input-field rounded-none border-2 border-black" maxLength="5" required />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-black mb-1">CVV:</label>
                  <input type="text" className="input-field rounded-none border-2 border-black" maxLength="3" required />
                </div>
              </div>
              <button type="submit" disabled={isProcessing} className="w-full bg-[#0056b3] hover:bg-blue-800 text-white font-bold py-3 mt-4 border-4 border-black uppercase cursor-pointer">
                {isProcessing ? 'מעבד...' : 'בצע תשלום'}
              </button>
            </form>
          </div>
        )}

        {/* Step 5: Success & Tracking */}
        {step === 5 && (
          <div className="p-4 border-t-4 border-black mt-4 bg-white">
             <div className="bg-green-200 border-4 border-green-600 p-4 text-center mb-6">
                <h2 className="text-2xl font-black text-green-900 uppercase">התשלום עבר בהצלחה!</h2>
                <p className="font-bold text-black mt-2">המשלוח אושר ונשלח לנקודת האיסוף.</p>
             </div>

             <h3 className="text-lg font-bold bg-black text-white p-2 text-center uppercase mb-4">סטטוס משלוח נוכחי:</h3>
             <div className="p-4 border-4 border-black bg-gray-100">
                <div className="flex mb-1 items-center justify-between text-[11px] font-bold text-black px-1 uppercase">
                    {STATUSES.map((status, index) => (
                      <span key={status} className={index <= currentStatusIndex ? "text-[#0056b3] bg-blue-100 px-1 border border-[#0056b3]" : "text-gray-500"}>
                          {index === 0 ? "הזמנה" : index === 1 ? "מיון" : index === 2 ? "בדרך" : "מוכן"}
                      </span>
                    ))}
                  </div>
                  <div className="h-6 border-4 border-black bg-white w-full mt-2">
                    <div style={{ width: `${progressPercent}%` }} className="h-full bg-[#ff0000] border-r-4 border-black"></div>
                  </div>
             </div>
             
             <button onClick={() => window.location.reload()} className="w-full bg-black text-white font-bold py-3 mt-6 border-4 border-gray-600 uppercase cursor-pointer hover:bg-gray-800">
                מעקב אחרי חבילה אחרת
             </button>
          </div>
        )}

      </main>
    </div>
  );
}
