import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http.adapters";


interface Options {
    baseUrl:string;
    params: Record<string, string>;

}

export class AxiosAdapter implements HttpAdapter {


    private axiosInstance: AxiosInstance;


    constructor (options:Options){

        this.axiosInstance = axios.create({
            baseURL:options.baseUrl,
            params:options.params
        })

    }


async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
  const fullUrl = this.axiosInstance.defaults.baseURL + url;

  try {
     const {data} = await this.axiosInstance.get<T>(url, options);   
    
    return data;
  } catch (err: any) {
    console.error(`[AxiosAdapter] Error GET ${fullUrl}:`, 
      err.response ?? err.message);
    throw err;
  }
}
   

}