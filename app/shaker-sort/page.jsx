"use client";
import SortPage from "@/components/sortPage";
import useSortingAnimation from "@/utils/sortLogic";

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

  const shakerSort = async () => {
    if (isSorted && lastSortDirection.current == sortDirection) {
      return;
    }

    if (isSorting) {
      sortingRef.current = true;
      setArray(getSortedArray(array));
      finishSort();
      return;
    }
    1;
    setIsSorting(true);
    sortingRef.current = false;

    let newArray = [...array];
    let swapped = true;
    let start = 0;
    let end = arraySize - 1;

    while (swapped) {
      swapped = false;

      for (let i = start; i < end; i++) {
        newArray = await processEpements(newArray, i, i + 1);
        swapped = true;
      }
      if (!swapped) {
        break;
      }

      swapped = false;
      end--;

      for (let i = end - 1; i >= start; i--) {
        newArray = await processEpements(newArray, i, i + 1);
        swapped = true;
      }
      start++;
    }

    finishSort();
  };

  const pythonCode = `def shakerSort(arr):\n    n = len(arr)\n    swapped = True\n    start = 0\n    end = n - 1\n    while swapped:\n        swapped = False\n        for i in range(start, end):\n            if arr[i] > arr[i + 1]:\n                arr[i], arr[i + 1] = arr[i + 1], arr[i]\n                swapped = True\n        if not swapped:\n            break\n        swapped = False\n        end -= 1\n        for i in range(end - 1, start - 1, -1):\n            if arr[i] > arr[i + 1]:\n                arr[i], arr[i + 1] = arr[i + 1], arr[i]\n                swapped = True\n        start += 1`;

  const cppCode = `void shakerSort(int arr[], int n) {\n    bool swapped = true;\n    int start = 0;\n    int end = n - 1;\n    while (swapped) {\n        swapped = false;\n        for (int i = start; i < end; ++i) {\n            if (arr[i] > arr[i + 1]) {\n                std::swap(arr[i], arr[i + 1]);\n                swapped = true;\n            }\n        }\n        if (!swapped)\n            break;\n        swapped = false;\n        --end;\n        for (int i = end - 1; i >= start; --i) {\n            if (arr[i] > arr[i + 1]) {\n                std::swap(arr[i], arr[i + 1]);\n                swapped = true;\n            }\n        }\n        ++start;\n    }\n}`;

  const cCode = `void shakerSort(int arr[], int n) {\n    int start = 0, end = n - 1, i, temp;\n    int swapped = 1;\n    while (swapped) {\n        swapped = 0;\n        for (i = start; i < end; ++i) {\n            if (arr[i] > arr[i + 1]) {\n                temp = arr[i];\n                arr[i] = arr[i + 1];\n                arr[i + 1] = temp;\n                swapped = 1;\n            }\n        }\n        if (!swapped)\n            break;\n        swapped = 0;\n        --end;\n        for (i = end - 1; i >= start; --i) {\n            if (arr[i] > arr[i + 1]) {\n                temp = arr[i];\n                arr[i] = arr[i + 1];\n                arr[i + 1] = temp;\n                swapped = 1;\n            }\n        }\n        ++start;\n    }\n}`;

  const cSharpCode = `void ShakerSort(int[] arr) {\n    int n = arr.Length;\n    bool swapped = true;\n    int start = 0, end = n - 1;\n    while (swapped) {\n        swapped = false;\n        for (int i = start; i < end; ++i) {\n            if (arr[i] > arr[i + 1]) {\n                int temp = arr[i];\n                arr[i] = arr[i + 1];\n                arr[i + 1] = temp;\n                swapped = true;\n            }\n        }\n        if (!swapped)\n            break;\n        swapped = false;\n        --end;\n        for (int i = end - 1; i >= start; --i) {\n            if (arr[i] > arr[i + 1]) {\n                int temp = arr[i];\n                arr[i] = arr[i + 1];\n                arr[i + 1] = temp;\n                swapped = true;\n            }\n        }\n        ++start;\n    }\n}`;

  return (
    <SortPage
      title="Сортировка пузырьком"
      sortingName="shaker-sort"
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
      sortFunction={shakerSort}
      pythonCode={pythonCode}
      cppCode={cppCode}
      cCode={cCode}
      cSharpCode={cSharpCode}
    ></SortPage>
  );
};

export default BubbleSort;
