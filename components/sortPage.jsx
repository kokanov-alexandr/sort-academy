"use client";
import BarChart from "@/components/barChart";
import Realization from "@/components/realization";
import { RadioGroup, Radio } from "@heroui/radio";

const SortPage = ({
  title,
  array,
  arraySize,
  setArraySize,
  sortingSpeed,
  setSortingSpeed,
  inputValue,
  isSorting,
  withDuplicates,
  setWithDuplicates,
  sortDirection,
  setsortDirection,
  initRandomArray,
  handleInputChange,
  sortFunction,
  pythonCode,
  cppCode,
  cCode,
  cSharpCode,
}) => {

  const sort = async () => {

  }
  return (
    <div>
      <div className="sorting-visualizer">
        <h1>Визуализатор сортировок - {title}</h1>
        <div className="controls">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Введите свой набор чисел от 1 до 1000 через пробел"
          />
          <button onClick={() => initRandomArray()} disabled={isSorting}>
            Размешать
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
            value={sortDirection}
            onValueChange={setsortDirection}
            color="secondary"
            label="Сортировка"
          >
            <Radio value="ascending">Возрастание</Radio>
            <Radio value="descending ">Убывание</Radio>
          </RadioGroup>
          <button
            onClick={async () => {
              await sortFunction();
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
        <div className="visualization-container">
          <BarChart
            data={array}
            containerHeight={300}
            arraySize={arraySize}
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

export default SortPage;
