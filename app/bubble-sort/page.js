"use client";
import BarChart from "@/components/barChart";
import Realization from "@/components/realization";
import { RadioGroup, Radio } from "@heroui/radio";
import useSortingAnimation from "@/utils/sortLogic";

const SortingVisualizer = () => {
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

  console.log(array);
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
    1;
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
    <div>
      <div className="sorting-visualizer">
        <h1>Визуализатор сортировок - Сортировка Шелла</h1>
        <div className="controls">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Введите свой набор чисел от 1 до 1000 через пробел"
          />
          <button onClick={() => initRandomArray()} disabled={isSorting}>
            Размещать
          </button>
          <label>
            <input
              type="checkbox"
              checked={withDuplicates}
              onChange={(e) => setWithDuplicates(e.target.checked)}
            />
            С повторениями
          </label>
          <RadioGroup
            value={sortRadio}
            onValueChange={setSortRadio}
            color="secondary"
            label="Сортировка"
          >
            <Radio value="ascending">Возрастание</Radio>
            <Radio value="descending ">Убывание</Radio>
          </RadioGroup>
          <button
            onClick={async () => {
              await shellSort();
            }}
          >
            Сортировать
          </button>
          <label>Количество элементов: {arraySize}</label>
          <input
            type="range"
            min="10"
            max="1000"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isSorting}
          />
          <label>Скорость Сортировки:</label>
          <input
            type="range"
            min="0"
            max="1500"
            value={sortingSpeed}
            onChange={(e) => setSortingSpeed(parseInt(e.target.value))}
            disabled={isSorting}
          />
        </div>
        <div className="visualization-container" ref={containerRef}>
          <BarChart data={array} containerHeight={300}></BarChart>
        </div>
        <style jsx>{`
          .sorting-visualizer {
            background-color: #121212;
            color: white;
            padding: 20px;
            font-family: sans-serif;
          }
          .controls {
            margin-bottom: 20px;
          }
        `}</style>
      </div>
      <div>
        <Realization
          pythonCode={pythonCode}
          cppCode={cppCode}
          cCode={cCode}
          cSharpCode={cSharpCode}
        ></Realization>
      </div>
    </div>
  );
};

export default SortingVisualizer;
