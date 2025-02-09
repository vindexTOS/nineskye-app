import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";



@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('get-prices')
  async getPrices() {
    return await this.appService.getPrices();
  }

  @Get("addresses")
 async getAddress(){
     return await this.appService.findAllAddress()
  }

}