export enum FlightFrom {
    CHINA = 'China',
    TURKEY = 'Turkey',
  }
  
  export  type CreateFlightType = {
    flight_id: string;
    flight_from: FlightFrom;
    arrived_at: string;  
  
  }
  