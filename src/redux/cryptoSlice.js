import { createSlice } from "@reduxjs/toolkit";
import { sampleCryptoCoins } from "../data/sampleCrypto";

// Helper functions
const parseNumber = (value) =>
  typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
const formatNumber = (value) =>
  value.toLocaleString("en-IN", { maximumFractionDigits: 2 });

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    assets: [...sampleCryptoCoins], 
    filter: "all",
    sort: "price",
    searchQuery: "",
  },
  reducers: {
    updatePrices: (state) => {
      state.assets = state.assets.map((asset) => {
        const rawPrice = parseNumber(asset.price);
        const rawVolume = parseNumber(asset.volume24h);
        const priceChange = (Math.random() * 2 - 1) * 0.005 * rawPrice;
        const updatedPrice = Math.max(0, rawPrice + priceChange);
        const updatedVolume = Math.max(
          0,
          rawVolume + (Math.random() * 1000000 - 500000)
        );

        return {
          ...asset,
          price: formatNumber(updatedPrice),
          percentChange1h: +(Math.random() * 2 - 1).toFixed(2),
          percentChange24h: +(Math.random() * 4 - 2).toFixed(2),
          percentChange7d: +(Math.random() * 10 - 5).toFixed(2),
          volume24h: formatNumber(updatedVolume),
        };
      });
    },
    updateFilter: (state, action) => {
      const { filter, searchQuery } = action.payload;
      state.filter = filter;
      state.searchQuery = searchQuery;
    },
    updateSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { updatePrices, updateFilter, updateSort } = cryptoSlice.actions;

export const selectCryptoData = (state) => {
  let filteredData = [...state.crypto.assets]; //shallow copy

  // Apply search filter
  if (state.crypto.searchQuery) {
    filteredData = filteredData.filter(
      (asset) =>
        asset.name
          .toLowerCase()
          .includes(state.crypto.searchQuery.toLowerCase()) ||
        asset.symbol
          .toLowerCase()
          .includes(state.crypto.searchQuery.toLowerCase())
    );
  }

  // Apply filter (top gainers, top losers)
  if (state.crypto.filter === "topGainers") {
    filteredData = filteredData.sort(
      (a, b) => b.percentChange24h - a.percentChange24h
    );
  } else if (state.crypto.filter === "topLosers") {
    filteredData = filteredData.sort(
      (a, b) => a.percentChange24h - b.percentChange24h
    );
  }

  // Apply sorting based on selected sort option
  if (state.crypto.sort === "price") {
    filteredData = filteredData.sort(
      (a, b) => parseNumber(b.price) - parseNumber(a.price)
    );
  } else if (state.crypto.sort === "volume") {
    filteredData = filteredData.sort(
      (a, b) => parseNumber(b.volume24h) - parseNumber(a.volume24h)
    );
  } else if (state.crypto.sort === "percentChange1h") {
    filteredData = filteredData.sort(
      (a, b) => b.percentChange1h - a.percentChange1h
    );
  }

  return filteredData;
};

export default cryptoSlice.reducer;
