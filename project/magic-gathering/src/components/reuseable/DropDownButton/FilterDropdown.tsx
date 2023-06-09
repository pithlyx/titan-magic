import React, { useState, useRef, useEffect } from "react"
import { Untap } from "../../assets/Logos"

const CheckboxOption = ({ option, selectedOptions, handleOptionClick }) => {
  const isSelected = selectedOptions.includes(option)
  return (
    <label
      className={`flex items-center justify-between px-4 py-2 text-txt hover:bg-container cursor-pointer ${isSelected && "bg-secondary"}`}
    >
      <input
        type="checkbox"
        value={option}
        checked={isSelected}
        onChange={() => handleOptionClick(option)}
        className="mr-2"
      />
      {option}
      <input
        type="text"
        onChange={() => console.log(e.value.target)}
        className="mr-2 w-1/3"
      />
    </label>
  )
}

const MenuContainer = ({ onChange }: any) => {
  const options = [
    "name",
    "lang",
    "cmc",
    "artist",
    "colors",
    "toughness",
    "power",
    "set",
    "set_name",
    "rarity",
    "prices",
    "games",
    "booster",
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const dropdownRef = useRef()

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  const handleOptionClick = (option) => {
    const isSelected = selectedOptions.includes(option)
    let newSelectedOptions = []

    if (isSelected) {
      newSelectedOptions = selectedOptions.filter((item) => item !== option)
    } else {
      newSelectedOptions = [...selectedOptions, option]
    }

    setSelectedOptions(newSelectedOptions)
    onChange(newSelectedOptions)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="flex items-center justify-between  px-4 py-2 bg-secondary rounded-md gap-x-2"
        onClick={toggleDropdown}
      >
        <span className="text-black">Filters</span>
        <Untap id="logo" className="h-5 " />
      </button>
      {isOpen && (
        <div className="absolute w-64 max-h-48 overflow-auto bg-menu rounded-md shadow-lg z-10">
          {options.map((option) => (
            <CheckboxOption
              key={option}
              option={option}
              selectedOptions={selectedOptions}
              handleOptionClick={handleOptionClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuContainer
