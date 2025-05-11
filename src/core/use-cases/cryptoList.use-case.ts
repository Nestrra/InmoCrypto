import { HttpAdapter } from "../../config/adapters/http/http.adapters";
import { CryptoCurrencyResponse } from "../../infrastructure/interfaces/cryptocurrency.responses";
import { CryptoMapper } from "../../infrastructure/mappers/crypto.mapper";
import type { Coin } from "../models/coin.model";

interface Options {
    start?:number;
    limit?:number
}


export const getCryptoList = async ( fetcher:HttpAdapter, options?:Options  ) : Promise<Coin[]> =>{
 
    try {

        const cryptoList = await fetcher.get<CryptoCurrencyResponse>('/tickers/',{
            params:{
                start:options?.start ?? 0,
                limit:options?.limit
            }
        })

  

        return cryptoList.data.map(result => CryptoMapper.fromCryptoDBResultToEntity(result))
        
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching CurrenctList');

    }



}