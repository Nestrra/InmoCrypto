import { useEffect, useState } from 'react'
import type { Coin } from '../../core/models/coin.model'
import { getCryptoList } from '../../core/use-cases/cryptoList.use-case'
import { cryptoDBFetcher } from '../../config/adapters/cryptoDB.adapter'

export const useCurrencyApi = () => {
  const [loading, setLoading] = useState(true)
  const [currencyList, setCurrencyList] = useState<Coin[]>([])
  const [start, setStart] = useState(0)

  const DEFAULT_LIMIT = 80   
  

  useEffect(() => {
    fetchList()
  }, [])


 
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
