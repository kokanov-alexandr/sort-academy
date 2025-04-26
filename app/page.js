"use client";
import Link from "next/link";
import { useState } from "react";
import sortingsService from "../serviсes/sortingsService";

const Home = ({}) => {
  const {
    data: sortings,
    error: testsError,
    isLoading: testsLoading,
  } = sortingsService.useGetSortings();
  const {
    trigger: createTest,
    error: createError,
    isMutating,
  } = sortingsService.useCreateSorting();
  const [newTestName, setNewTestName] = useState("");

  if (testsLoading) return <p>Loading tests...</p>;
  if (testsError) return <p>Error: {testsError.message}</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Сортировки</h1>
        <div>
          {sortings.map((item) => (
            <div key={item.id}>
              <Link href={item.name}>{item.displayName}</Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
