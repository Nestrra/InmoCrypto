import { AxiosAdapter } from "./http/axios.adapter";

export const cryptoDBFetcher = new AxiosAdapter({

    baseUrl:'https://api.coinlore.net/api',
    params:{}

})