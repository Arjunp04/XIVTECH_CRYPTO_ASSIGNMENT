import React, { useEffect } from "react";
import CryptoTable from "./components/CryptoTable";
import { selectCryptoData, updatePrices } from "./redux/cryptoSlice";
import { useDispatch, useSelector } from "react-redux";
import FilterSortSearch from "./components/FilterSortSearch";

const App = () => {
  const dispatch = useDispatch();
  const cryptoData = useSelector(selectCryptoData);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePrices());
    }, 2000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="bg-black">
      <div className="flex flex-col items-center py-10 bg-white min-h-screen mx-auto">
        <h1 className="text-3xl font-semibold">Crypto Price Tracker</h1>
        <FilterSortSearch />
        <CryptoTable cryptoData={cryptoData} />
      </div>
    </div>
  );
};

export default App;
