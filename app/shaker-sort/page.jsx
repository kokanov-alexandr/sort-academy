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

  const pythonCode = ``;

  const cppCode = ``;

  const cCode = ``;

  const cSharpCode = ``;
  return (
    <SortPage
      title="Сортировка пузырьком"
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
