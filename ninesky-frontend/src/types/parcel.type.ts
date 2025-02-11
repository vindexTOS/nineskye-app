export interface ParcelDto {
    tracking_id: string;
    weight: number;
    ownerId: string;
  }
  
  export interface CreateParcelsType {
    flightId: string;
    parcels: ParcelDto[];
  }
  