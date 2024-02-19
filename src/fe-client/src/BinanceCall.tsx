import React, { useState, useEffect, useCallback } from 'react';
import { WebSocket } from 'ws';
// import https from 'https';
// import ccxt from 'ccxt';

const symbols = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'ETHTUSD'];

interface TokenPrice {
  symbol: string;
  price: number;
  bid?: number;
  ask?: number;
  high?: number;
  low?: number;
  timestamp: number;
}

const BinanceCall: React.FC = () => {
  const [prices, setPrices] = useState<Record<string, TokenPrice>>({});

  // Use useCallback to avoid unnecessary re-renders
  const fetch24hr = useCallback(async (symbol: string) => {
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.symbol || !data.highPrice || !data.lowPrice) {
      throw new Error(`Error fetching 24hr data for ${symbol}`);
    }

    return {
      highPrice: parseFloat(data.highPrice),
      lowPrice: parseFloat(data.lowPrice),
    };
  } catch (error) {
    console.error(`Error fetching 24hr data for ${symbol}:`, error);
    return { highPrice: 0, lowPrice: 0 }; // Handle errors gracefully
  }
  }, []);

  const handleTrade = useCallback((symbol: string, price: number) => {
    setPrices(prevPrices => {
      const updatedPrice = prevPrices[symbol] || { symbol, price, timestamp: Date.now() };
      updatedPrice.price = (updatedPrice.price + price) / 2;
      updatedPrice.timestamp = Date.now();
      return { ...prevPrices, [symbol]: updatedPrice };
    });
  }, []);

  useEffect(() => {
    symbols.forEach(symbol => {
      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@aggTrade`);

      ws.onmessage = (message:any) => {
        const trade = JSON.parse(message.data);
        const newPrice = parseFloat(trade.p);
        handleTrade(symbol, newPrice);
      };
    });

    // Fetch initial 24hr data
    symbols.forEach(async (symbol) => {
      try {
        const ticker = await fetch24hr(symbol);
        setPrices(prevPrices => ({
          ...prevPrices,
          [symbol]: {
            ...prevPrices[symbol],
            high: ticker.highPrice,
            low: ticker.lowPrice,
          },
        }));
      } catch (error) {
        console.error(`Error fetching ${symbol} ticker data:`, error);
      }
    });

    // Periodically update 24hr data
    const interval = setInterval(() => {
      symbols.forEach(async (symbol) => {
        try {
          const ticker = await fetch24hr(symbol);
          setPrices(prevPrices => ({
            ...prevPrices,
            [symbol]: {
              ...prevPrices[symbol],
              high: ticker.highPrice,
              low: ticker.lowPrice,
            },
          }));
        } catch (error) {
          console.error(`Error fetching ${symbol} ticker data:`, error);
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {Object.values(prices).map(price => (
        <div key={price.symbol}>
          <h2>{price.symbol}</h2>
          <p>Price: {price.price}</p>
          <p>Bid: {price.bid}</p>
          <p>Ask: {price.ask}</p>
          <p>High: {price.high}</p>
          <p>Low: {price.low}</p>
        </div>
      ))}
    </div>
  );
};

export default BinanceCall;