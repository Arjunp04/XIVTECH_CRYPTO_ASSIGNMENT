import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFilter, updateSort } from "../redux/cryptoSlice";
import { FaSearch } from "react-icons/fa"; 

const FilterSortSearch = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("price");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Load settings from localStorage
    const savedFilter = localStorage.getItem("cryptoFilter");
    const savedSort = localStorage.getItem("cryptoSort");
    const savedSearch = localStorage.getItem("cryptoSearch");

    if (savedFilter) setFilter(savedFilter);
    if (savedSort) setSelectedSort(savedSort);
    if (savedSearch) setSearchQuery(savedSearch);
  }, []);

  useEffect(() => {
    // Update localStorage whenever the state changes
    localStorage.setItem("cryptoFilter", filter);
    localStorage.setItem("cryptoSort", selectedSort);
    localStorage.setItem("cryptoSearch", searchQuery);

    dispatch(updateFilter({ filter, searchQuery }));
    dispatch(updateSort(selectedSort));
  }, [filter, selectedSort, searchQuery, dispatch]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-[1400px] px-4 mx-auto mt-6 gap-6">
     
      <div className="relative w-full md:w-3/5 lg:w-[70%]">
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="px-10 py-2 rounded border border-gray-400 w-full focus:outline-none focus:border-blue-700 ring focus:ring ring-gray-200 focus:ring-blue-700 transition duration-200"
        />
      </div>

      {/* Filter and Sort (Right side) */}
      <div className="flex w-full md:w-3/5 lg:w-[30%]  justify-between gap-6">
        {/* Filter */}
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="px-4 py-2 rounded border border-gray-400 w-full focus:outline-none focus:border-blue-700 ring focus:ring ring-gray-200 focus:ring-blue-700 transition duration-200"
        >
          <option value="all">All</option>
          <option value="topGainers">Top Gainers</option>
          <option value="topLosers">Top Losers</option>
        </select>

        {/* Sort */}
        <select
          onChange={(e) => setSelectedSort(e.target.value)}
          value={selectedSort}
          className="px-4 py-2 rounded border border-gray-400 w-full focus:outline-none focus:border-blue-700 ring focus:ring ring-gray-200 focus:ring-blue-700 transition duration-200"
        >
          <option value="price">Sort by Price</option>
          <option value="volume">Sort by Volume</option>
          <option value="percentChange1h">Sort by 1h Change</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortSearch;
