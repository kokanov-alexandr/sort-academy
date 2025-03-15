"use client";
import React, { useState, useEffect, useRef } from "react";
import BarChart from "@/components/barChart";
import { RadioGroup, Radio } from "@heroui/radio";
const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(47);
  const [sortingSpeed, setSortingSpeed] = useState(1500);
  const [inputValue, setInputValue] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [withDuplicates, setWithDuplicates] = useState(false);
  const [sortRadio, setSortRadio] = useState("ascending");
  const containerRef = useRef(null);
  const sortingRef = useRef(false);

  const getSortedArray = (array) => {
    return [...array].sort((a, b) => a - b);
  };

  const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, 1500 - ms));

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

  return (
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
        <RadioGroup value={sortRadio} onValueChange={setSortRadio} color="secondary" label="Сортировка">
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
        <BarChart
          data={array}
          containerHeight={containerRef.current?.offsetHeight || 300}
        ></BarChart>
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
  );
};

export default SortingVisualizer;
