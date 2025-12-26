import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BookingStateService {

  private flightId: number | null = null;
  private passengerIds: number[] = [];

  setFlightId(flightId: number) {
    this.flightId = flightId;
  }

  setPassengerIds(ids: number[]) {
    this.passengerIds = ids;
  }

  getFlightId(): number | null {
    return this.flightId;
  }

  getPassengerIds(): number[] {
    return this.passengerIds;
  }

  reset() {
    this.flightId = null;
    this.passengerIds = [];
  }
}
