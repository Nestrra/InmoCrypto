import { HttpAdapter } from "../../config/adapters/http/http.adapters";
import { CryptoCurrencyResponse } from "../../infrastructure/interfaces/cryptocurrency.responses";
import { CryptoMapper } from "../../infrastructure/mappers/crypto.mapper";
import type { Coin } from "../models/coin.model";
/**
 * Parámetros opcionales para paginación.
 */
interface Options {
    start?:number;
    limit?:number
}

/**
 * Obtiene un listado de criptomonedas paginado desde la API de CoinLore.
 *
 * @param fetcher - Adaptador HTTP que implementa HttpAdapter.
 * @param options - Parámetros de paginación (start offset y limit máximo).
 * @returns Promise<Coin[]> - Promesa que resuelve en el array de entidades Coin.
 * @throws Error si la petición falla o la respuesta no es válida.
 *
 * @example
 * const coins = await getCryptoList(cryptoDBFetcher, { start: 0, limit: 20 });
 */
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