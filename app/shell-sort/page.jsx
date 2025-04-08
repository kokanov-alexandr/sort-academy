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
    delay,
    initShuffledArray,
    initRandomArray,
    handleInputChange,
    sortingRef,
    finishSort,
    comparator,
    lastSortDirection,
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
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        let temp = array[i];
        let j = i;
        while (j >= gap && comparator(array[j - gap], temp)) {
          if (sortingRef.current) {
            finishSort();
            return;
          }

          await delay(sortingSpeed);
          let newArray = [...array];
          newArray[j] = array[j - gap];

          if (sortingRef.current) {
            finishSort();
            return;
          }

          setArray(newArray);

          array[j] = array[j - gap];
          j -= gap;
        }
        array[j] = temp;
        await delay(sortingSpeed);
        let newArray = [...array];
        newArray[j] = temp;
        if (sortingRef.current) {
          finishSort();
          return;
        }

        setArray(newArray);
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
