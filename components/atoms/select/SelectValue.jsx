"use client";
import { ChevronDown, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";

const SelectValue = ({
  cnSelect,
  label,
  dataAos,
  error,
  trigger,
  watch,
  KEY,
  setValue,
  icon,
  data,
  classname,
  place,
  valueField = "value",
  displayField = null,
  searchable = true, // New prop to enable/disable search
}) => {
  const t = useTranslations();
  const locale = useLocale();

  const [val, setVal] = useState();
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [filteredData, setFilteredData] = useState(data); // Filtered data based on search

  // Get display text based on locale and displayField prop
  const getDisplayText = (item) => {
    if (displayField) {
      return item[displayField];
    }
    return item?.name_en ? item[`name_${locale}`] : item?.name;
  };

  // Get value from item based on valueField prop
  const getValue = (item) => {
    return item[valueField] || item?.value || item?.name_en || item?.name;
  };

  // Filter data based on search term in both name and name_ar
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => {
        const searchLower = searchTerm.toLowerCase();

        // Search in name_en
        if (item.name_en?.toLowerCase().includes(searchLower)) {
          return true;
        }

        // Search in name_ar
        if (item.name_ar?.toLowerCase().includes(searchLower)) {
          return true;
        }

        // Search in name (if exists)
        if (item.name?.toLowerCase().includes(searchLower)) {
          return true;
        }

        // Search in value (if user searches by value)
        if (item.value?.toLowerCase().includes(searchLower)) {
          return true;
        }

        return false;
      });
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const handleValue = (item) => {
    const displayText = getDisplayText(item);
    const value = getValue(item);

    setVal({ name: displayText, value: value });
    setValue?.(KEY, value);
    setValue?.(KEY + "GET", item);
    setShow(false);
    setSearchTerm(""); // Clear search when item is selected
  };

  const watchKey = watch?.(KEY);
  useEffect(() => {
    if (watchKey) trigger?.(KEY);
    if (watchKey == undefined) setVal(null);
  }, [watchKey]);

  const watchKeyGET = watch?.(KEY + "GET");
  useEffect(() => {
    if (watchKeyGET) {
      const displayText = getDisplayText(watchKeyGET);
      const value = getValue(watchKeyGET);
      setVal({ name: displayText, value: value });
    } else {
      setVal(null);
    }
  }, [watchKeyGET]);

  const selectRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShow(false);
        setSearchTerm(""); // Clear search when closing dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //! Filter based on key input for keyboard navigation
  const [typedKey, setTypedKey] = useState("");
  const dropdownRefs = useRef([]);

  //! Filter based on key input for keyboard navigation
  useEffect(() => {
    if (typedKey && !searchTerm) {
      // Only use typedKey if search is not active
      const index = filteredData.findIndex((e) =>
        getDisplayText(e)?.toLowerCase().startsWith(typedKey.toLowerCase())
      );
      if (index !== -1 && dropdownRefs.current[index]) {
        dropdownRefs.current[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [typedKey, filteredData, searchTerm]);

  //! Handle keypress events for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!show) return;

      // If user is typing in search input, don't use keyboard navigation
      if (searchable && document.activeElement === searchInputRef.current) {
        return;
      }

      if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
        setTypedKey(event.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, searchable]);

  const searchInputRef = useRef(null);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (show && searchable && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [show, searchable]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setTypedKey(""); // Clear typed key when searching
  };

  const clearSearch = () => {
    setSearchTerm("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div
      ref={selectRef}
      data-aos={dataAos}
      className={`${classname} z-[100] relative select flex flex-col gap-[5px] w-full`}
    >
      {label && (
        <label htmlFor={KEY} className={`text16`}>
          {label}
        </label>
      )}

      <div
        onClick={() => {
          setShow(!show);
          if (!show) {
            setSearchTerm(""); // Clear search when opening dropdown
          }
        }}
        className={`${cnSelect} pointer-events-auto border-b-[#BCBBBF] border-b-[1px] duration-300 cursor-pointer w-full h-[50px] flex justify-between items-center`}
      >
        <div className="flex items-center px-[10px] gap-[9px] P-12">
          <div
            className={`text16 ${val?.name ? "text-white" : "text-[#9ca3af]"}`}
          >
            {val?.name || place}
          </div>
        </div>
        <ChevronDown
          className={`${
            show ? "rotate-[180deg]" : ""
          } w-[16px] h-[16px] duration-300`}
        />
      </div>

      <div
        className={`${
          show
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } z-[10000] max-h-[280px] overflow-auto pb-10 duration-300 shadow-md ease-in-out absolute top-[110%] w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-box`}
      >
        {/* Search Input */}
        {searchable && (
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t("search") || "Search..."}
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results Count */}
        {searchable && searchTerm && (
          <div className="px-3 py-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
            {filteredData.length} {t("results") || "results"} found
          </div>
        )}

        {/* No Results Message */}
        {searchTerm && filteredData.length === 0 && (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            {t("noResults") || "No results found"}
          </div>
        )}

        {/* Dropdown Items */}
        {filteredData.map((item, i) => (
          <div
            ref={(el) => (dropdownRefs.current[i] = el)}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 P-12 duration-100 min-h-[35px] cursor-pointer flex items-center px-[10px] border-b border-gray-100 dark:border-gray-600 last:border-b-0"
            key={i}
            onClick={() => handleValue(item)}
          >
            <span className="text16 text-gray-900 dark:text-white duration-0">
              {getDisplayText(item)}
            </span>
          </div>
        ))}
      </div>

      {error && <div className="error absolute"> {t(error?.message)} </div>}
    </div>
  );
};

export default SelectValue;
