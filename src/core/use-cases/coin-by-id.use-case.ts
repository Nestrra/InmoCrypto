import { HttpAdapter } from "../../config/adapters/http/http.adapters";
import { CoinResponse, CryptoCurrencyResponse } from "../../infrastructure/interfaces/cryptocurrency.responses";
import { CryptoMapper } from "../../infrastructure/mappers/crypto.mapper";
import { Coin } from "../models/coin.model";




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




