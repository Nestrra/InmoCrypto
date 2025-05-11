import { AxiosAdapter } from "./http/axios.adapter";

/**
 * Instancia de HttpAdapter configurada para comunicarse
 * con la API de CoinLore.
 *
 * Base URL: https://api.coinlore.net/api
 * Query params por defecto: ninguno
 *
 * @type {HttpAdapter}
 */
export const cryptoDBFetcher = new AxiosAdapter({

    baseUrl:'https://api.coinlore.net/api',
    params:{}

})