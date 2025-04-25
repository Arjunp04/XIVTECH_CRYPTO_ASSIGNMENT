import React from "react";
import { FaRegStar } from "react-icons/fa";
import chart from "../assets/chart.png";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const getChangeColor = (value) => {
  if (value > 0) return "text-green-600";
  if (value < 0) return "text-red-600"; 
  return "text-gray-600"; 
};

const getArrow = (value) => {
  if (value > 0) return <FaCaretUp className="text-green-600 text-xl" />; 
  if (value < 0) return <FaCaretDown className="text-red-600 text-xl" />;
  return <FaCaretDown className="text-gray-600 text-xl" />;
};

const CryptoAssets = ({ crypto }) => {
  return (
    <tr className="py-3 px-2 md:px-6 flex items-center text-sm transition-colors duration-300">
      <td className="w-5 md:w-8 text-start cursor-pointer">
        <FaRegStar className="text-gray-500 text-base" />
      </td>
      <td className="w-5 md:w-8 text-end">{crypto.id}</td>
      <td className="flex items-center w-40 md:w-64 pl-8 text-start">
        <img src={crypto.logo} alt={crypto.name} className="w-8 h-8 mr-2" />
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="mr-1.5 font-medium">{crypto.name}</span>
          <span className="text-xs text-gray-600">{crypto.symbol}</span>
        </div>
      </td>

      <td className={`w-36 text-end font-medium`}>${crypto.price}</td>

      <td
        className={`w-20 text-end font-medium ${getChangeColor(
          crypto.percentChange1h
        )}`}
      >
        <span className="inline-flex items-end justify-end  gap-0.5">
          {getArrow(crypto.percentChange1h)}
          {crypto.percentChange1h}
        </span>
      </td>

      <td
        className={`w-20 text-end font-medium ${getChangeColor(
          crypto.percentChange24h
        )}`}
      >
        <span className="inline-flex items-end justify-end gap-0.5">
          {getArrow(crypto.percentChange24h)}
          {crypto.percentChange24h}
        </span>
      </td>

      <td
        className={`w-20 text-end font-medium ${getChangeColor(
          crypto.percentChange7d
        )}`}
      >
        <span className="inline-flex items-end justify-end gap-0.5">
          {getArrow(crypto.percentChange7d)}
          {crypto.percentChange7d}
        </span>
      </td>

      <td className="w-44 text-end font-medium">${crypto.marketCap}</td>
      <td className="w-44 text-end font-medium">${crypto.volume24h}</td>
      <td className="w-44 text-end font-medium">{crypto.circulatingSupply}</td>
      <td className="w-44 h-14 pl-10 text-end">
        <img src={crypto.chart7Days} alt="7 day chart" />
      </td>
    </tr>
  );
};

export default CryptoAssets;
