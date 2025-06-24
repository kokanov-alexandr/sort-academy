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
    <div className="container mx-auto px-4 max-w-8xl">
      <div className="sorting-visualizer">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white tracking-tight">
          Визуализатор сортировок —{" "}
          <span className="text-primary">{title}</span>
        </h1>
        <div className="controls flex flex-wrap gap-4 items-end mb-8">
          <Button
            onClick={() => initRandomArray()}
            disabled={isSorting}
            className="mb-2"
          >
            Размешать
          </Button>
          <Button
            onClick={async () => {
              await sortFunction();
            }}
            className="mb-2"
          >
            Сортировать
          </Button>
          <div className="flex flex-col gap-1 mb-2">
            <span className="text-xs text-gray-400">Сортировка</span>
            <RadioGroup
              value={sortDirection}
              onValueChange={setsortDirection}
              color="secondary"
              label="Сортировка"
              className="flex gap-4"
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
          </div>
          <div className="flex items-center space-x-2 mb-2">
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
          <div className="flex flex-col gap-2 w-full max-w-md">
            <label className="text-sm text-gray-300">
              Количество элементов:{" "}
              <span className="font-semibold text-white">{arraySize}</span>
            </label>
            <Slider
              defaultValue={[arraySize]}
              max={100}
              step={1}
              onValueChange={setArraySize}
              disabled={isSorting}
              className={cn("w-full")}
            />
            <label className="text-sm text-gray-300 mt-2">
              Скорость сортировки:{" "}
              <span className="font-semibold text-white">{sortingSpeed}</span>
            </label>
            <Slider
              defaultValue={[sortingSpeed]}
              max={1500}
              step={1}
              onValueChange={setSortingSpeed}
              disabled={isSorting}
              className={cn("w-full")}
            />
          </div>
        </div>
        <div className="">
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
