import { CryptoMapper } from '../src/infrastructure/mappers/crypto.mapper';
import type { Result } from '../src/infrastructure/interfaces/cryptocurrency.responses';

describe('CryptoMapper', () => {
  it('debe mapear correctamente Result → Coin', () => {
    // 1) Creamos un objeto raw idéntico al de la API
    const raw: Result = {
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
    };

    // 2) Llamamos al mapper
    const coin = CryptoMapper.fromCryptoDBResultToEntity(raw);

    // 3) Aserciones
    expect(coin.id).toBe(raw.id);
    expect(coin.symbol).toBe(raw.symbol);
    expect(coin.name).toBe(raw.name);
    expect(coin.nameid).toBe(raw.nameid);
    expect(coin.rank).toBe(raw.rank);
    expect(coin.price_usd).toBe(raw.price_usd);
    expect(coin.percent_change_24h).toBe(raw.percent_change_24h);
    expect(coin.percent_change_1h).toBe(raw.percent_change_1h);
    expect(coin.percent_change_7d).toBe(raw.percent_change_7d);
    expect(coin.price_btc).toBe(raw.price_btc);
    expect(coin.market_cap_usd).toBe(raw.market_cap_usd);
    expect(coin.volume24).toBe(raw.volume24);
    expect(coin.volume24a).toBe(raw.volume24a);
    expect(coin.csupply).toBe(raw.csupply);
    expect(coin.tsupply).toBe(raw.tsupply);
    expect(coin.msupply).toBe(raw.msupply);
  });
});
