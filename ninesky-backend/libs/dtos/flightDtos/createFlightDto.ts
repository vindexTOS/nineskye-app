// create-flight.dto.ts
import { IsEnum, IsNotEmpty, IsDateString, IsOptional, IsString } from 'class-validator';
import { FlightFrom } from 'libs/enums/flightsFrom.enum';
import { ShippingStatus } from 'libs/enums/shipping.status.enum';

export class CreateFlightDto {
  @IsNotEmpty()
  @IsString()
  flight_id: string;

  @IsEnum(FlightFrom)
  flight_from: FlightFrom;

  @IsDateString()
  arrived_at: string; // Can be a date string which will be converted to Date
}

// update-flight.dto.ts

export class UpdateFlightDto {
  @IsOptional()
  @IsEnum(FlightFrom)
  flight_from?: FlightFrom;

  @IsOptional()
  @IsEnum(ShippingStatus)
  shipping_status?: ShippingStatus;

  @IsOptional()
  @IsDateString()
  arrived_at?: string;

  @IsOptional()
 
  flight_id?: string;
}
