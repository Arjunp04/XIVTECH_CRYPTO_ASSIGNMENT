import React from "react";
import CryptoAssets from "./CryptoAssets";
import { TiInfoLarge } from "react-icons/ti";

const CryptoTable = ({ cryptoData }) => {
  
  return (
    <div className="my-10 w-full px-2 md:px-4 max-w-[1500px] overflow-x-auto relative bg-white">
      <table className="min-w-full text-sm relative">
        <thead className="border-y border-gray-300 bg-gray-100 text-[13px]">
          <tr className="py-4 px-2 md:px-6 flex ">
            <th className="w-5 md:w-8 text-start "></th>
            <th className="w-5 md:w-8 text-end">#</th>
            <th className="w-40 md:w-64 pl-8 text-start">Name</th>

            <th className="w-36 text-end">Price</th>
            <th className="w-20 text-end">1h %</th>
            <th className="w-20 text-end">24h %</th>
            <th className="w-20 text-end">7d %</th>
            <th className="w-44 text-end">
              Market Cap
              <span className="inline-flex items-center justify-center size-4 rounded-full bg-gray-300 text-gray-900 text-xs ml-1 cursor-pointer">
                <TiInfoLarge />
              </span>
            </th>
            <th className="w-44 text-end">
              Volume(24h)
              <span className="inline-flex items-center justify-center size-4 rounded-full bg-gray-300 text-gray-900 text-xs ml-1 cursor-pointer">
                <TiInfoLarge />
              </span>
            </th>
            <th className="w-44 text-end">
              Circulating Supply
              <span className="inline-flex items-center justify-center size-4 rounded-full bg-gray-300 text-gray-900 text-xs ml-1 cursor-pointer">
                <TiInfoLarge />
              </span>
            </th>

            <th className="w-44 text-end">Last 7 Days</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {cryptoData.map((crypto, index) => (
            <CryptoAssets key={index} index={index + 1} crypto={crypto} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
