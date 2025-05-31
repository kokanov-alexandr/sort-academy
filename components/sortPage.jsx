"use client";
import SortChart from "@/components/barChart";
import Realization from "@/components/realization";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  const handleCheckboxClick = (newCheckedState) => {
    setWithDuplicates(newCheckedState);
  };

  return (
    <div>
      <div className="sorting-visualizer">
        <h1>Визуализатор сортировок - {title}</h1>
        <div className="controls">
          <Button onClick={() => initRandomArray()} disabled={isSorting}>
            Размешать
          </Button>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={withDuplicates}
              onCheckedChange={handleCheckboxClick}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              С повторениями
            </label>
          </div>
          <RadioGroup
            value={sortDirection}
            onValueChange={setsortDirection}
            color="secondary"
            label="Сортировка"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ascending" />
              <Label htmlFor="r1">Возрастание</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="descending" />
              <Label htmlFor="r1">Убывание</Label>
            </div>
          </RadioGroup>
          <Button
            onClick={async () => {
              await sortFunction();
            }}
          >
            Сортировать
          </Button>
          <label>Количество элементов: {arraySize}</label>
          <Slider
            defaultValue={[arraySize]}
            max={100}
            step={1}
            onValueChange={setArraySize}
            disabled={isSorting}
            className={cn("w-[30%]")}
          />
          <label>Скорость Сортировки: {sortingSpeed}</label>
          <Slider
            defaultValue={[sortingSpeed]}
            max={1500}
            step={1}
            onValueChange={setSortingSpeed}
            disabled={isSorting}
            className={cn("w-[30%]")}
          />{" "}
        </div>
        <div className="visualization-container">
          <SortChart
            data={array}
            containerHeight={300}
            arraySize={arraySize}
          ></SortChart>
        </div>
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
