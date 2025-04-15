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

  const pythonCode = ``;

  const cppCode = ``;

  const cCode = ``;

  const cSharpCode = ``;

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
