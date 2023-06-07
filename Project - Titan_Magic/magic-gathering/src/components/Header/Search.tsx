import { useEffect, useRef, useState } from 'react';
import NavButton from './NavButton';
import Logo from './Logo';

const SearchBar = (props: any) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef?.current?.focus();
  }, []);

  const search = (event: any) => {
    const text: string = event.target.value;
    console.log(text);
  };

  const clearInput = () => {
    const inputElement = searchInputRef?.current;
    if (inputElement) {
      inputElement.value = '';
      props.search('');
    }
  };
  let shouldRenderClearBtn = false;
  const length = searchInputRef?.current?.value?.length;
  useEffect(() => {
    if (length !== undefined && length > 0) {
      shouldRenderClearBtn = true;
    }
  }, [search]);

  return (
    <div className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 lg:fixed lg:w-full lg:top-0 lg:z-50 lg:left-0">
      <div className="container p-4 mx-auto">
        <div className="flex flex-col lg:items-center lg:justify-center lg:flex-row lg:space-x-4">
          <div className="lg:w-1/3 flex flex-col items-center sm:flex-row sm:justify-center">
            <Logo className="object-cover object-left h-8" color="#ffffff" />
            <h1 className="flex items-center pl-2 mt-2 text-2xl text-gray-600 dark:border-gray-700 dark:text-gray-300 lg:mt-0 sm:ml-2 sm:border-l sm:border-gray-400">
              Titan-Magic
            </h1>
          </div>

          <div className="lg:w-1/3 relative h-10 mt-4 sm:w-96 xl:w-80 2xl:w-96 sm:mx-auto lg:m-0">
            <input
              ref={searchInputRef}
              className="w-full h-full text-gray-700 bg-white text-center border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-gray-400 focus:ring-opacity-20"
              type="text"
              placeholder="Search"
              onChange={search}
            />
            {shouldRenderClearBtn && (
              <>
                <button
                  onClick={clearInput}
                  className="absolute text-gray-500 -translate-y-1/2 right-2 focus:outline-none top-1/2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className="lg:w-1/3 flex flex-col mt-4 space-y-3 lg:mt-0 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center sm:justify-center">
            <NavButton hidden="View" label="Decks" />
            <NavButton hidden="View" label="Collections" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
