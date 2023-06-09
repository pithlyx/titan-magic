import React, { useState, useEffect } from "react"
import CheckboxDropdown from "./DropDownButton/FilterDropdown"
import MenuContainer from "./DropDownButton/FilterDropdown"

const SearchBar = () => {
  const [search, setSearch] = useState("")

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const [selectedOptions, setSelectedOptions] = useState([])

  const handleOptionsChange = (newOptions) => {
    setSelectedOptions(newOptions)
    console.log(selectedOptions)
  }

  return (
    <div
      id="search-bar-container"
      className="sticky top-0 z-50 bg-container flex justify-between items-center p-2"
    >
      <MenuContainer buttonText="Filters" onChange={handleOptionsChange} />
      <input
        type="text"
        className="w-2/3 border p-2 m-2 border-primary rounded-full bg-container text-center mx-auto"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  )
}

export default SearchBar
