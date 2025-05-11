import { useEffect, useState } from 'react'
import type { Coin } from '../../core/models/coin.model'
import { getCryptoList } from '../../core/use-cases/cryptoList.use-case'
import { cryptoDBFetcher } from '../../config/adapters/cryptoDB.adapter'

/**
 * Custom hook para obtener y paginar la lista de criptomonedas.
 *
 * @returns {Object} Objeto con las siguientes propiedades:
 * - loading: indica si se está cargando la lista.
 * - currencyList: array de objetos Coin.
 * - nextPage: función para cargar la siguiente página de resultados.
 * - fetchList: función para recargar la lista desde el inicio con un límite opcional.
 */

export const useCurrencyApi = () => {
  const [loading, setLoading] = useState(true)
  const [currencyList, setCurrencyList] = useState<Coin[]>([])
  const [start, setStart] = useState(0)

  const DEFAULT_LIMIT = 80   
  

  useEffect(() => {
    fetchList()
  }, [])


  /**
   * Carga la lista de criptomonedas desde el inicio.
   *
   * @param {number} [lmt=DEFAULT_LIMIT] - Cantidad de elementos a obtener.
   */
  const fetchList = async (lmt: number = DEFAULT_LIMIT) => {
    
    setLoading(true)
    const resp = await getCryptoList(cryptoDBFetcher, {
      start: 0,
      limit: lmt,
    })
    
    setCurrencyList(resp)
    setStart(lmt)      
    setLoading(false)
  }

   /**
   * Carga la siguiente página de resultados.
   * Incrementa el offset por DEFAULT_LIMIT y concatena nuevos items.
   */
  const nextPage = async () => {
    const nextStart = start + DEFAULT_LIMIT
    const nextPageCoins = await getCryptoList(cryptoDBFetcher, {
      start: nextStart,
      limit: DEFAULT_LIMIT,
    })
    setCurrencyList(prev => [...prev, ...nextPageCoins])
    setStart(nextStart)
  }

  return {
    loading,
    currencyList,
    nextPage,
    fetchList,    
  }
}
