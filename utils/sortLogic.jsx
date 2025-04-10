"use client";
import { useState, useRef, useEffect } from "react";

function useSortingAnimation() {
  const DEFAULT_ARRAY_SIZE = 47;
  const DEFAULT_SORTING_SPEED = 1500;
  const DEFAULT_SORT_DIRECTION = "ascending";

  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE);
  const [sortingSpeed, setSortingSpeed] = useState(DEFAULT_SORTING_SPEED);
  const [inputValue, setInputValue] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [withDuplicates, setWithDuplicates] = useState(false);
  const [sortDirection, setsortDirection] = useState(DEFAULT_SORT_DIRECTION);
  const sortingRef = useRef(false);
  const lastSortDirection = useRef(DEFAULT_SORT_DIRECTION);

  const getSortedArray = (array) => {
    return [...array].sort((a, b) =>
      sortDirection == DEFAULT_SORT_DIRECTION ? a - b : b - a
    );
  };

  const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, DEFAULT_SORTING_SPEED - ms));

  const initShuffledArray = () => {
    const shuffledArray = Array.from({ length: arraySize }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .slice(0, arraySize);
    setArray(shuffledArray);
    setIsSorted(false);
  };

  const finishSort = () => {
    setIsSorting(false);
    setIsSorted(true);
    lastSortDirection.current = sortDirection;
  };

  const initRandomArray = () => {
    if (!withDuplicates) {
      initShuffledArray();
      return;
    }

    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * arraySize) + 1
    );
    setArray(newArray);
    setIsSorted(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const comparator = (firstElement, secondElement) => {
    if (sortDirection === DEFAULT_SORT_DIRECTION) {
      return firstElement > secondElement;
    } else {
      return firstElement < secondElement;
    }
  };

  useEffect(() => {
    initRandomArray();
  }, [arraySize]);

  return {
    array,
    setArray,
    arraySize,
    setArraySize,
    sortingSpeed,
    setSortingSpeed,
    inputValue,
    setInputValue,
    isSorting,
    setIsSorting,
    isSorted,
    setIsSorted,
    withDuplicates,
    setWithDuplicates,
    sortDirection,
    setsortDirection,
    getSortedArray,
    delay,
    initShuffledArray,
    initRandomArray,
    handleInputChange,
    sortingRef,
    finishSort,
    comparator,
    lastSortDirection,
  };
}

export default useSortingAnimation;
