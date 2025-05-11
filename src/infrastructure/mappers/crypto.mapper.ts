import { Coin } from "../../core/models/coin.model";
import type { Result } from "../interfaces/cryptocurrency.responses";




export class CryptoMapper {

  /**
   * Transforma un objeto Result (estructura de la respuesta JSON)
   * en una instancia de Coin (modelo de la aplicación).
   *
   * @param {Result} result - Objeto obtenido desde la API de CoinLore.
   * @returns {Coin} - Entidad de dominio con los campos tipados.
   *
   * @example
   * const raw: Result = await fetcher.get<Result>(...);
   * const coinEntity: Coin = CryptoMapper.fromCryptoDBResultToEntity(raw);
   */
    static fromCryptoDBResultToEntity(result:Result):Coin{
      
    return{
    id: result.id,
    symbol: result.symbol,
    name: result.name,
    nameid: result.nameid,
    rank: result.rank,
    price_usd:  result.price_usd,
    percent_change_24h: result.percent_change_24h,
    percent_change_1h: result.percent_change_1h,
    percent_change_7d: result.percent_change_7d,
    price_btc: result.price_btc,
    market_cap_usd: result.market_cap_usd,
    volume24: result.volume24,
    volume24a: result.volume24a,
    csupply: result.csupply,
    tsupply: result.tsupply,
    msupply: result.msupply,

}
    }

}