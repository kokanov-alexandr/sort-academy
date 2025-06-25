"use client";
import { useParams } from "next/navigation";
import testsService from "../../../components/services/testsService";

const Test = () => {
  const { id } = useParams();
  const {
    data: test,
    error: testError,
    isLoading: testLoading,
  } = testsService.useGetTestById(id);

  if (testLoading) return <p>Loading tests...</p>;
  if (testError) return <p>Error: {testError.message}</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Тест</h1>
        <div>{test.name}</div>
        <div>{test.description}</div>
        <div>{test.sorting.displayName}</div>
        <div>Вопросы:</div>
        {test.questions &&
          test.questions.map((question) => (
            <div key={question.id}>
              <h2>{question.content}</h2>
              {question.answerOptions.map((answer) => (
                <div key={answer.id}>
                  <span>{answer.value}</span>
                  {answer.isCorrect ? (
                    <span className="text-green-500"> (Правильный ответ)</span>
                  ) : (
                    <span className="text-red-500"> (Неправильный ответ)</span>
                  )}
                </div>
              ))}
            </div>
          ))}
      </main>
    </div>
  );
};

export default Test;
