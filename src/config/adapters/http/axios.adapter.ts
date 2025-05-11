import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http.adapters";

/**
 * Opciones de configuración para AxiosAdapter
 * @property baseUrl - URL base para todas las peticiones
 * @property params - Parámetros query por defecto para cada petición
 */
interface Options {
  baseUrl: string;
  params: Record<string, string>;

}
/**
 * Adapter que implementa HttpAdapter usando Axios como cliente HTTP.
 * Encapsula la configuración de Axios y provee un método genérico `get`.
 */
export class AxiosAdapter implements HttpAdapter {


  private axiosInstance: AxiosInstance;

  /**
      * Construye una instancia de AxiosAdapter.
      * @param options - Configuración inicial del adaptador
      */
  constructor(options: Options) {

    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      params: options.params
    })

  }

    /**
     * Realiza una petición GET a la URL especificada y devuelve los datos tipados.
     * @template T - Tipo esperado en la respuesta
     * @param url - Ruta (relativa a baseUrl) a la que hacer el GET
     * @param options - Opciones de configuración de la petición (headers, params, etc.)
     * @returns {Promise<T>} - Datos crudos de la respuesta HTTP
     * @throws Error si la petición falla
     */
    
  async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
    const fullUrl = this.axiosInstance.defaults.baseURL + url;

    try {
      const { data } = await this.axiosInstance.get<T>(url, options);

      return data;
    } catch (err: any) {
      console.error(`[AxiosAdapter] Error GET ${fullUrl}:`,
        err.response ?? err.message);
      throw err;
    }
  }


}