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
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import sortingsService from "@/components/services/sortingsService";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const complexityMap = {
  1: "O(1)",
  2: "O(log n)",
  3: "O(√n)",
  4: "O(n)",
  5: "O(n log n)",
  6: "O(n^2)",
  7: "O(n^3)",
  8: "O(2^n)",
  9: "O(n!)",
};

const SortPage = ({
  title,
  sortingName,
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
  const {
    data: sortingInfo,
    error,
    isLoading,
  } = sortingsService.useGetSortingByName(sortingName);

  const handleCheckboxClick = (newCheckedState) => {
    setWithDuplicates(newCheckedState);
  };

  return (
    <div className="container mx-auto px-4 max-w-8xl">
      <div className="sorting-visualizer">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-4xl font-extrabold text-center mt-4">
            Визуализатор сортировок
          </h1>
          <div className="text-xl sm:text-2xl font-semibold text-center mt-4">
            {title}
          </div>
        </div>
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
        <Card className="mt-8">
          <CardContent>
            <SortChart
              data={array}
              containerHeight={300}
              arraySize={arraySize}
            />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <Realization
            className="mb-4"
            pythonCode={pythonCode}
            cppCode={cppCode}
            cCode={cCode}
            cSharpCode={cSharpCode}
          />
        </div>
        <div>
          {isLoading ? (
            <div className="text-center my-8">
              Загрузка информации о сортировке...
            </div>
          ) : error ? (
            <div className="text-center my-8 text-red-500">
              Ошибка загрузки информации о сортировке
            </div>
          ) : (
            sortingInfo && (
              <Card className="mb-4">
                <CardContent>
                  <CardTitle className="mb-2 text-2xl">
                    {sortingInfo.displayName}
                  </CardTitle>
                  <CardDescription className="mb-4 text-base">
                    {sortingInfo.description}
                  </CardDescription>
                  {Array.isArray(sortingInfo.sortingSortingProperty) &&
                    sortingInfo.sortingSortingProperty.length > 0 && (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Свойство</TableHead>
                            <TableHead>Сложность</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortingInfo.sortingSortingProperty.map((prop) => (
                            <TableRow key={prop.sortingPropertyId}>
                              <TableCell>
                                {prop.sortingProperty.name ===
                                  "best_case_time" && "Лучший случай"}
                                {prop.sortingProperty.name ===
                                  "worst_case_time" && "Худший случай"}
                                {prop.sortingProperty.name ===
                                  "average_case_time" && "Средний случай"}
                                {prop.sortingProperty.name ===
                                  "space_complexity" && "Память"}
                              </TableCell>
                              <TableCell>
                                <span className="font-mono font-semibold">
                                  {complexityMap[prop.value]}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SortPage;
