import React, { useEffect, useState } from 'react'
import { Coin } from '../../core/models/coin.model'
import { getCoinById } from '../../core/use-cases/coin-by-id.use-case'
import { cryptoDBFetcher } from '../../config/adapters/cryptoDB.adapter'

export const useDetailCoin = (id: string) => {

    const [loading, setLoading] = useState(true)
    const [coin, setCon] = useState<Coin>()

    useEffect(() => {

        getCoin()

    }, [id])




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
