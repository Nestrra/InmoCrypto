import React, { useEffect, useState } from 'react'
import { Coin } from '../../core/models/coin.model'
import { getCoinById } from '../../core/use-cases/coin-by-id.use-case'
import { cryptoDBFetcher } from '../../config/adapters/cryptoDB.adapter'
/**
 * Hook personalizado para obtener los detalles de una criptomoneda por ID.
 *
 * @param {string} id - Identificador de la moneda a consultar.
 * @returns {{ loading: boolean; coin?: Coin }}
 *  - loading: indica si se está cargando la información.
 *  - coin: objeto Coin con los datos de la criptomoneda (undefined mientras carga).
 */
export const useDetailCoin = (id: string) => {

    const [loading, setLoading] = useState(true)
    const [coin, setCon] = useState<Coin>()

    useEffect(() => {

        getCoin()

    }, [id])



  /**
   * Función que llama al caso de uso para obtener la moneda y actualiza el estado.
   */
    const getCoin = async () => {

        const coin = await getCoinById(cryptoDBFetcher, id)
        
        setCon(coin)
        setLoading(false)
 

    }


    return {

        loading,
        coin


    }
}
