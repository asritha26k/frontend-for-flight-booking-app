export interface Ticket {
  id: number;
  pnr: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  numberOfSeats: number;
  booked: boolean;
  passengers: {
    name: string;
    email: string;
    phoneNum: string;
  }[];
}
