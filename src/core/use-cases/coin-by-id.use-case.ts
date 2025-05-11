import { HttpAdapter } from "../../config/adapters/http/http.adapters";
import { CoinResponse, CryptoCurrencyResponse } from "../../infrastructure/interfaces/cryptocurrency.responses";
import { CryptoMapper } from "../../infrastructure/mappers/crypto.mapper";
import { Coin } from "../models/coin.model";

/**
 * Obtiene los detalles de una criptomoneda concreta a partir de su ID.
 *
 * Realiza una petición GET al endpoint `/ticker/?id={id}` y mapea la respuesta
 * al modelo de dominio Coin.
 *
 * @param fetcher - Adaptador HTTP que cumple la interfaz HttpAdapter.
 * @param id - Identificador de la moneda a consultar.
 * @returns Promise<Coin> - Resolves con la entidad Coin si se encuentra.
 * @throws Error si la petición falla o no se encuentra la moneda.
 *
 * @example
 * const coin = await getCoinById(cryptoDBFetcher, "90");
 * console.log(coin.name); // Bitcoin
 */


export const getCoinById = async (fetcher: HttpAdapter, id: string): Promise<Coin> => {
    try {

        const coin = await fetcher.get<CoinResponse>(`/ticker/?id=${id}`);
        const rawArray = coin;
        if (!Array.isArray(rawArray) || rawArray.length === 0) {
            throw new Error("No se encontró la moneda con ese id");
        }
        const raw = rawArray[0];
        
        const coinResult = CryptoMapper.fromCryptoDBResultToEntity(raw);
     
        return coinResult;

    } catch (error) {
       
        throw new Error('Error fetching CurrenctList');

    }
}




