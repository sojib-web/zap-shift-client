// @ts-nocheck
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import DistrictMap from "./DistrictMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceDataMap = useLoaderData();

  const [searchTerm, setSearchTerm] = useState(""); // Trigger for search
  const [inputText, setInputText] = useState(""); // Text input value

  const handleSearch = () => {
    setSearchTerm(inputText);
  };

  return (
    <div className="bg-white mb-10 rounded-xl shadow p-8  mt-10">
      <h2 className="text-2xl md:text-3xl font-bold text-[#03373D] mb-4">
        We are available in{" "}
        <span className="text-[#A3D101]">
          {serviceDataMap.length} districts
        </span>
      </h2>

      <SearchBar
        inputText={inputText}
        setInputText={setInputText}
        handleSearch={handleSearch}
      />

      <hr className="mb-6 mt-10 bg-[#F5F5F5] h-px border-0" />

      <h3 className="text-md font-semibold text-[#03373D] mb-4">
        We deliver almost all over Bangladesh
      </h3>

      <DistrictMap serviceDataMap={serviceDataMap} searchTerm={searchTerm} />
    </div>
  );
};

export default Coverage;
