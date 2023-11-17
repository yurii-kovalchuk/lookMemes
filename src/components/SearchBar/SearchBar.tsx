"use client";
import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";
import "./SearchBar.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    router.push(`?search=${e.target.value}`);
  };

  return (
    <form className="searchForm">
      <input
        name="search"
        type="search"
        placeholder="Search"
        className="searchInput"
        value={search}
        onChange={handleChange}
      />
      <button type="button" className="searchBtn">
        <LuSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
