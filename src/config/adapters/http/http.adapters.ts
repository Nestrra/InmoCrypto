

export abstract class HttpAdapter {
 /**
   * Realiza una petición HTTP GET a la ruta o URL proporcionada.
   *
   * @template T - Tipo de dato que esperamos recibir en la respuesta.
   * @param url - Ruta (o URL relativa) del endpoint al cual hacer la petición.
   * @param options - Opciones adicionales de petición (headers, params, timeout, etc.).
   * @returns {Promise<T>} - Promesa que resuelve con los datos del cuerpo de la respuesta.
   * @throws Error si la petición falla.
   */
    abstract get<T>(url:string, options?:Record<string, unknown>) : Promise<T>;


}