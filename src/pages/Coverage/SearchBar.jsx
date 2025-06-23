import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ inputText, setInputText, handleSearch }) => {
  return (
    <div className="flex items-center bg-[#f3f6fa] rounded-full w-full max-w-xl overflow-hidden">
      <div className="flex items-center pl-4">
        <FiSearch className="text-gray-500 text-lg" />
      </div>
      <input
        type="text"
        placeholder="Search here"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="flex-grow bg-transparent focus:outline-none px-3 py-3 text-sm text-gray-700"
      />
      <button
        onClick={handleSearch}
        className="bg-lime-300 text-black font-semibold rounded-full px-6 py-3 hover:bg-lime-400 transition-all duration-200"
      >
        GO
      </button>
    </div>
  );
};

export default SearchBar;
