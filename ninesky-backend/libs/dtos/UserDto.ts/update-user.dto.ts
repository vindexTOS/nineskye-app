import { IsEmail, IsEnum,  IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';
import { AccessLevel } from 'libs/enums/accese.levels.enum';
export class UpdateUserDto   {
      @IsOptional()
      @IsString()
      @Length(2, 50)
      first_name?: string;
    
      @IsOptional()
      @IsString()
      @Length(2, 50)
      last_name?: string;
    
      @IsOptional()
      @IsEmail()
      email?: string;
    
 
    
      @IsOptional()
      @IsNumber()
      phone_number?: string;
    
      @IsOptional()
      @IsString()
      @Matches(/^[0-9]{11}$/, { message: 'Personal number must be exactly 11 digits' })
      personal_number?: string;
    
      @IsOptional()
      @IsString()
      office?: string;
    
      @IsOptional()
      @IsString()
      city?: string;
    
      @IsOptional()
      @IsString()
      address?: string;
    
      @IsEnum(AccessLevel)
      @IsOptional()
      accessLevel? : AccessLevel;
}
