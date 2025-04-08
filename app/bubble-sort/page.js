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
    sortRadio,
    setSortRadio,
    containerRef,
    getSortedArray,
    delay,
    initShuffledArray,
    initRandomArray,
    handleInputChange,
    sortingRef,
  } = useSortingAnimation();

  const shellSort = async () => {
    if (isSorted) {
      return;
    }

    if (isSorting) {
      sortingRef.current = true;
      setArray(getSortedArray(array));
      setIsSorting(false);
      return;
    }

    setIsSorting(true);
    sortingRef.current = false;

    let n = array.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        let temp = array[i];
        let j = i;
        while (j >= gap && array[j - gap] > temp) {
          if (sortingRef.current) {
            return;
          }

          await delay(sortingSpeed);
          let newArray = [...array];
          newArray[j] = array[j - gap];

          if (sortingRef.current) {
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
          return;
        }

        setArray(newArray);
      }
    }
    setIsSorting(false);
    setIsSorted(true);
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
    <SortPage
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
      sortRadio={sortRadio}
      setSortRadio={setSortRadio}
      containerRef={containerRef}
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

export default BubbleSort;
