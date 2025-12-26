import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Ticket } from '../../models/Ticket';
import { SeatMap } from '../../models/SeatMap';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  // Gateway routes the ticket service under /ticket-service/ticket/**
  private readonly baseUrl = 'http://localhost:8765/ticket-service/ticket';

  constructor(private readonly http: HttpClient) {}

  // Get tickets by email
getTicketsByEmail(email: string): Observable<Ticket[]> {
  return this.http
    .get<Ticket[] | null>(`${this.baseUrl}/getTicketsByEmail/${email}`, {
      withCredentials: true,
    })
    .pipe(
      map((tickets: Ticket[] | null): Ticket[] => tickets ?? []),
      catchError(this.handleError)
    );
}

  // Cancel ticket
  cancelTicket(id: number): Observable<string> {
    return this.http
      .delete(`${this.baseUrl}/cancel/${id}`, {
        withCredentials: true,
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }
bookTicket(payload: { flightId: number; passengerIds: number[]; seatNumbers: string[] }) {
  return this.http.post(
    `${this.baseUrl}/book`,
    payload,
    {
      withCredentials: true,
      responseType: 'text'
    }
  ).pipe(catchError(this.handleError));
}

getSeatMap(flightId: number): Observable<SeatMap> {
  return this.http.get<SeatMap>(`${this.baseUrl}/seat-map/${flightId}`, {
    withCredentials: true
  }).pipe(catchError(this.handleError));
}


  private handleError(error: HttpErrorResponse) {
    let message = 'Something went wrong. Please try again later.';

    if (error.status === 0) {
    
      message = 'Unable to connect to server.';
    } else if (error.status === 401) {
      message = 'Unauthorized. Please login again.';
    } else if (error.status === 403) {
      message = 'Access denied.';
    } else if (error.status === 404) {
      message = 'Requested resource not found.';
    } else if (error.error) {
      message = error.error;
    }

    console.error('HTTP Error:', error);
    return throwError(() => message);
  }
}
