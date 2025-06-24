"use client";
import SortPage from "@/components/sortPage";
import useSortingAnimation from "@/utils/sortLogic";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import sortingsService from "@/components/services/sortingsService";

const complexityMap = {
  1: "O(1)",
  2: "O(log n)",
  3: "O(√n)",
  4: "O(n)",
  5: "O(n log n)",
  6: "O(n^2)",
  7: "O(n^3)",
  8: "O(2^n)",
  9: "O(n!)",
};

const BubbleSort = ({}) => {
  const {
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
    initShuffledArray,
    initRandomArray,
    handleInputChange,
    sortingRef,
    finishSort,
    lastSortDirection,
    processEpements,
  } = useSortingAnimation();

  const {
    data: sortingInfo,
    error,
    isLoading,
  } = sortingsService.useGetSortingByName("bubble-sort");

  const bubbleSort = async () => {
    if (isSorted && lastSortDirection.current == sortDirection) {
      return;
    }

    if (isSorting) {
      sortingRef.current = true;
      setArray(getSortedArray(array));
      finishSort();
      return;
    }

    setIsSorting(true);
    sortingRef.current = false;

    let newArray = [...array];
    for (let i = 0; i < arraySize; i++) {
      for (let j = 0; j < arraySize - i - 1; j++) {
        if (sortingRef.current) {
          finishSort();
          return;
        }

        newArray = await processEpements(newArray, j, j + 1);
      }
    }
    finishSort();
  };

  const pythonCode = `
  def bubbleSort(arr):
    n = len(arr)
    for i in range(n-1):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]`;

  const cppCode = `void swap(int *xp, int *yp) {
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}


void bubbleSort(int arr[], int n) {
    int i, j;
    for (i = 0; i < n-1; i++)
        for (j = 0; j < n-i-1; j++)
            if (arr[j] > arr[j+1])
                swap(&arr[j], &arr[j+1]);
}`;

  const cCode = `void bubble_sort(long arr[], long n) {
  long c, d, t;

  for (c = 0 ; c < n - 1; c++) {
    for (d = 0 ; d < n - c - 1; d++) {
      if (arr[d] > arr[d+1]) {
        t = arr[d];
        arr[d] = arr[d+1];
        arr[d+1] = t;
      }
    }
  }
}`;

  const cSharpCode = ``;
  return (
    <>
      <SortPage
        title="Сортировка пузырьком"
        sortingName="bubble-sort"
        array={array}
        setArray={setArray}
        arraySize={arraySize}
        setArraySize={setArraySize}
        sortingSpeed={sortingSpeed}
        setSortingSpeed={setSortingSpeed}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isSorting={isSorting}
        setIsSorting={setIsSorting}
        isSorted={isSorted}
        setIsSorted={setIsSorted}
        withDuplicates={withDuplicates}
        setWithDuplicates={setWithDuplicates}
        sortDirection={sortDirection}
        setsortDirection={setsortDirection}
        initShuffledArray={initShuffledArray}
        initRandomArray={initRandomArray}
        handleInputChange={handleInputChange}
        sortFunction={bubbleSort}
        pythonCode={pythonCode}
        cppCode={cppCode}
        cCode={cCode}
        cSharpCode={cSharpCode}
      ></SortPage>
    </>
  );
};

export default BubbleSort;
