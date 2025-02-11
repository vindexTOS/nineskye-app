import { Injectable, InternalServerErrorException } from "@nestjs/common";
 import { Address } from "libs/entities/address.entety";
import { Price } from "libs/entities/prices.entity";
import { EntityManager, Repository } from "typeorm";




@Injectable()
export class AppService {
  constructor(
    private readonly entityManager: EntityManager,
  ) { }

  async getPrices()  : Promise<Price> {
    try {
      const prices = await this.entityManager.findOne(Price , { where: { id: process.env.PRICE_ID }})
      return prices;

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

    async findAllAddress(): Promise<Address[]> {
      try {
        return  await this.entityManager.find(Address);
  
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    }
}