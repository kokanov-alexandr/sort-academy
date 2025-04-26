"use client";
import Link from "next/link";
import testsService from "../../serviсes/testsService";

const Tests = ({}) => {
  const {
    data: tests,
    error: testsError,
    isLoading: testsLoading,
  } = testsService.useGetTests();

  if (testsLoading) return <p>Loading tests...</p>;
  if (testsError) return <p>Error: {testsError.message}</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Тесты</h1>
        <div>
          {tests.map((item, index) => (
            <div key={item.id}>
              <h2>
                id: {item.id} Название: {item.name}
              </h2>
              <p>Описание: {item.description}</p>
              <br />
              <Link href={`/test/${item.id}`}>
                <button>Пройти тест</button>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Link href="/tests/create">
        <button>Перейти на страницу Tests</button>
      </Link>
    </div>
  );
};

export default Tests;
