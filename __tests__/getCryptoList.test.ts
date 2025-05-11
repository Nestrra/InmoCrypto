// __tests__/getCryptoList.test.ts

import { getCryptoList } from '../src/core/use-cases/cryptoList.use-case';
import type {
  CryptoCurrencyResponse,
  Result,
} from '../src/infrastructure/interfaces/cryptocurrency.responses';
import type { HttpAdapter } from '../src/config/adapters/http/http.adapters';
import { CryptoMapper } from '../src/infrastructure/mappers/crypto.mapper';

describe('getCryptoList', () => {
  it('debe devolver un array de Coins usando el adapter mock', async () => {
    // 1) Preparamos un array de resultados crudos
    const fakeResults: Result[] = [
      {
        id: '90',
        symbol: 'BTC',
        name: 'Bitcoin',
        nameid: 'bitcoin',
        rank: 1,
        price_usd: '104584.20',
        percent_change_24h: '0.90',
        percent_change_1h: '0.14',
        percent_change_7d: '9.16',
        price_btc: '1.00',
        market_cap_usd: '2077081918601.30',
        volume24: 28057067466.237125,
        volume24a: 26818543401.623577,
        csupply: '19860380.00',
        tsupply: '19860380',
        msupply: '21000000',
      },
    ];

    // 2) Creamos la respuesta fake incluyendo 
    const fakeResponse: CryptoCurrencyResponse = {
      info: {
        coins_num: fakeResults.length,
        time: Date.now(),
       
      },
      data: fakeResults,
    };

    // 3) Creamos un adapter ficticio con get() mockeado
    const mockAdapter: HttpAdapter = {
      get: jest.fn().mockResolvedValue(fakeResponse),
    };

    // 4) Ejecutamos el caso de uso
    const coins = await getCryptoList(mockAdapter, { start: 0, limit: 1 });

    // 5) Comprobamos que se llamó al adapter con los parámetros correctos
    expect(mockAdapter.get).toHaveBeenCalledWith('/tickers/', {
      params: { start: 0, limit: 1 },
    });

    // 6) Validamos el resultado devuelto
    expect(Array.isArray(coins)).toBe(true);
    expect(coins.length).toBe(1);

    // 7) El primer coin debe coincidir con el mapeo de CryptoMapper
    const expected = CryptoMapper.fromCryptoDBResultToEntity(fakeResults[0]);
    expect(coins[0]).toEqual(expected);
  });
});
