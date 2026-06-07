export const initialShipments = [
  {
    id: 'mock-1',
    trackingNumber: 'IL-12345678',
    customerName: 'ישראל ישראלי',
    phoneLast4: '1234',
    status: 'Order Confirmed',
    price: '29.00',
  }
];

export const STATUSES = [
  'Order Confirmed',
  'Sorting Center',
  'Out for Delivery',
  'Ready for Pickup'
];

export const mockPickupPoints = [
  { id: 'p1', name: "סופר-פארם רעננה", address: "אחוזה 142, רעננה" },
  { id: 'p2', name: "Yellow פז אחוזה", address: "אחוזה 68, רעננה" },
  { id: 'p3', name: "מגה בעיר", address: "התדהר 15, רעננה" }
];
