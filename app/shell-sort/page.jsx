"use client";
import SortPage from "@/components/sortPage";
import useSortingAnimation from "@/utils/sortLogic";

const ShellSort = ({}) => {
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

  const shellSort = async () => {
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

    let n = array.length;
    let newArray = [...array];
    for (let i = Math.floor(n / 2); i > 0; i = Math.floor(i / 2)) {
      for (let j = i; j < n; j++) {
        for (let k = j - i; k >= 0; k -= i) {
          newArray = await processEpements(newArray, k, k + i);
        }
      }
    }
    finishSort();
  };

  const pythonCode = `def shellSort(arr):\n    n = len(arr)\n    gap = n // 2\n    while gap > 0:\n        for i in range(gap, n):\n            temp = arr[i]\n            j = i\n            while j >= gap and arr[j - gap] > temp:\n                arr[j] = arr[j - gap]\n                j -= gap\n            arr[j] = temp\n        gap //= 2`;

  const cppCode = `void shellSort(int arr[], int n) {\n    for (int gap = n/2; gap > 0; gap /= 2) {\n        for (int i = gap; i < n; i++) {\n            int temp = arr[i];\n            int j;\n            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)\n                arr[j] = arr[j - gap];\n            arr[j] = temp;\n        }\n    }\n}`;

  const cCode = `void shellSort(int arr[], int n) {\n    int gap, i, j, temp;\n    for (gap = n/2; gap > 0; gap /= 2) {\n        for (i = gap; i < n; i++) {\n            temp = arr[i];\n            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)\n                arr[j] = arr[j - gap];\n            arr[j] = temp;\n        }\n    }\n}`;

  const cSharpCode = `void ShellSort(int[] arr) {\n    int n = arr.Length;\n    for (int gap = n / 2; gap > 0; gap /= 2) {\n        for (int i = gap; i < n; i++) {\n            int temp = arr[i];\n            int j;\n            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)\n                arr[j] = arr[j - gap];\n            arr[j] = temp;\n        }\n    }\n}`;

  return (
    <SortPage
      title="Сортировка Шелла"
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
      sortFunction={shellSort}
      pythonCode={pythonCode}
      cppCode={cppCode}
      cCode={cCode}
      cSharpCode={cSharpCode}
    ></SortPage>
  );
};

export default ShellSort;
