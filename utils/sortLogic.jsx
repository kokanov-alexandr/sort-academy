"use client";
import { useState, useRef, useEffect } from "react";

function useSortingAnimation() {
  const DEFAULT_ARRAY_SIZE = 47;
  const DEFAULT_SORTING_SPEED = 1500;
  const DEFAULT_SORT_RADIO = "ascending";

  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE);
  const [sortingSpeed, setSortingSpeed] = useState(DEFAULT_SORTING_SPEED);
  const [inputValue, setInputValue] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [withDuplicates, setWithDuplicates] = useState(false);
  const [sortRadio, setSortRadio] = useState(DEFAULT_SORT_RADIO);
  const containerRef = useRef(null);
  const sortingRef = useRef(false);

  const getSortedArray = (array) => {
    return [...array].sort((a, b) => a - b);
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
    sortRadio,
    setSortRadio,
    containerRef,
    getSortedArray,
    delay,
    initShuffledArray,
    initRandomArray,
    handleInputChange,
    sortingRef,
  };
}

export default useSortingAnimation;
