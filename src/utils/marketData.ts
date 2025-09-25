import axios from "axios";

export interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface AssetInfo {
  symbol: string;
  name: string;
  currentPrice: number;
  change24h: number;
}

// Mock data for stocks since free APIs have limitations
const mockStockData: Record<string, CandlestickData[]> = {
  AAPL: [
    { time: Date.now() - 86400000 * 5, open: 180, high: 185, low: 178, close: 183 },
    { time: Date.now() - 86400000 * 4, open: 183, high: 188, low: 182, close: 186 },
    { time: Date.now() - 86400000 * 3, open: 186, high: 190, low: 184, close: 188 },
    { time: Date.now() - 86400000 * 2, open: 188, high: 192, low: 186, close: 190 },
    { time: Date.now() - 86400000 * 1, open: 190, high: 195, low: 188, close: 193 },
  ],
  NVDA: [
    { time: Date.now() - 86400000 * 5, open: 450, high: 470, low: 440, close: 465 },
    { time: Date.now() - 86400000 * 4, open: 465, high: 480, low: 460, close: 475 },
    { time: Date.now() - 86400000 * 3, open: 475, high: 490, low: 470, close: 485 },
    { time: Date.now() - 86400000 * 2, open: 485, high: 500, low: 480, close: 495 },
    { time: Date.now() - 86400000 * 1, open: 495, high: 510, low: 490, close: 505 },
  ],
  GOOGL: [
    { time: Date.now() - 86400000 * 5, open: 140, high: 145, low: 138, close: 143 },
    { time: Date.now() - 86400000 * 4, open: 143, high: 148, low: 141, close: 146 },
    { time: Date.now() - 86400000 * 3, open: 146, high: 150, low: 144, close: 148 },
    { time: Date.now() - 86400000 * 2, open: 148, high: 152, low: 146, close: 150 },
    { time: Date.now() - 86400000 * 1, open: 150, high: 155, low: 148, close: 153 },
  ],
};

const mockStockPrices: Record<string, AssetInfo> = {
  AAPL: { symbol: "AAPL", name: "Apple Inc.", currentPrice: 193, change24h: 2.5 },
  NVDA: { symbol: "NVDA", name: "Nvidia Corporation", currentPrice: 505, change24h: 5.2 },
  GOOGL: { symbol: "GOOGL", name: "Alphabet Inc.", currentPrice: 153, change24h: 1.8 },
};

export async function fetchCandlestickData(symbol: string): Promise<CandlestickData[]> {
  // For stocks, return mock data
  if (["AAPL", "NVDA", "GOOGL"].includes(symbol)) {
    return mockStockData[symbol] || [];
  }

  // For cryptos, try to fetch from CoinGecko
  try {
    const coinId = getCoinGeckoId(symbol);
    if (!coinId) return [];

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=7`
    );

    if (response.data && Array.isArray(response.data)) {
      return response.data.map((item: number[]) => ({
        time: item[0],
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
      }));
    }
  } catch (error) {
    console.error(`Error fetching candlestick data for ${symbol}:`, error);
  }

  return [];
}

export async function fetchAssetInfo(symbol: string): Promise<AssetInfo | null> {
  // For stocks, return mock data
  if (mockStockPrices[symbol]) {
    return mockStockPrices[symbol];
  }

  // For cryptos, fetch from CoinGecko
  try {
    const coinId = getCoinGeckoId(symbol);
    if (!coinId) return null;

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`
    );

    if (response.data && response.data[coinId]) {
      const data = response.data[coinId];
      return {
        symbol,
        name: getAssetName(symbol),
        currentPrice: data.usd,
        change24h: data.usd_24h_change || 0,
      };
    }
  } catch (error) {
    console.error(`Error fetching asset info for ${symbol}:`, error);
  }

  return null;
}

function getCoinGeckoId(symbol: string): string | null {
  const coinIds: Record<string, string> = {
    ETH: "ethereum",
    USDC: "usd-coin",
    USDT: "tether",
    BTC: "bitcoin",
    ADA: "cardano",
  };
  return coinIds[symbol] || null;
}

function getAssetName(symbol: string): string {
  const names: Record<string, string> = {
    ETH: "Ethereum",
    USDC: "USD Coin",
    USDT: "Tether",
    BTC: "Bitcoin",
    ADA: "Cardano",
    AAPL: "Apple Inc.",
    NVDA: "Nvidia Corporation",
    GOOGL: "Alphabet Inc.",
  };
  return names[symbol] || symbol;
}