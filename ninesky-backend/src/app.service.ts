import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Address } from "libs/entities/address.entety";
import { Price } from "libs/entities/prices.entity";
import { EntityManager, Repository } from "typeorm";

import axios from 'axios';
import * as cron from 'node-cron';
import * as cheerio from 'cheerio';


@Injectable()
export class AppService {
  constructor(
    private readonly entityManager: EntityManager,
  ) { }






  async parseTry(): Promise<number> {
    const url = 'https://www.lari.ge/';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);


    const value = $("td[style*='img2.jpg'] span").first().text().trim();
    return Number(value)
  }



  async getPrices() {



    try {
      const prices = await this.entityManager.findOne(Price, { where: { id: process.env.PRICE_ID } })
      const currency: any = await this.parseTry()
      const getCurrency = currency.toFixed(2)
      const turkeyPrice = prices.Turkey /getCurrency
      const chinaPrice =  prices.China / currency.toFixed(2)
      const usdPrice = {
        turkeyUSD:turkeyPrice.toFixed(2),
        chinaUSD:  chinaPrice.toFixed(2)

      }

      return { regularPrice: prices, usdPrice };

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAllAddress(): Promise<Address[]> {
    try {
      return await this.entityManager.find(Address);

    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }




  async GetRequestAxios(url: string) {
    try {
      const res = await axios.get(url);

      return res.data;
    } catch (error) {
      console.error(`Error scraping  ${url}`, error);
    }
  }

}