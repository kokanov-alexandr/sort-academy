"use client";
import { useParams } from "next/navigation";
import testsService from "../../../serviсes/testsService";
import testResultsService from "../../../serviсes/testResultService";
import { useState, useEffect } from "react";
import TestResult from "@/components/testResult";

const TestPage = () => {
  const { testId } = useParams();
  const userId = 1;
  const {
    data: test,
    error: testError,
    isLoading: testLoading,
  } = testsService.useGetTestById(testId);

  const {
    trigger: createTestResult,
    error: createTestResultError,
    isMutatingTest,
  } = testResultsService.useCreateTestResult();

  const {
    trigger: createQuestionResult,
    error: createQuestionResultError,
    isMutatingQueston,
  } = testResultsService.useCreateQuestionResult();

  const [testResultId, setTestResultId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const createTestResultDto = async () => {
    return await createTestResult({
      user: {
        id: userId,
      },
      test: {
        id: testId,
      },
    });
  };

  const createQuestionResultDto = () => {
    console.log(testResultId + " " + test.questions[currentQuestionIndex].id);
    return {
      testResult: {
        id: testResultId,
      },
      question: {
        id: test.questions[currentQuestionIndex].id,
      },
      userAnswerOptions: selectedAnswers,
    };
  };

  const startTest = async () => {
    setIsTestCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    let storedTestResultId = localStorage.getItem("testResultId");
    if (!storedTestResultId) {
      const newTestResult = await createTestResultDto();
      storedTestResultId = newTestResult;
      setTestResultId(storedTestResultId);
      localStorage.setItem("testResultId", storedTestResultId);
      localStorage.setItem("currentQuestionIndex", 0);
    } else {
      setTestResultId(storedTestResultId);
      let storedCurrentQuestionIndex = localStorage.getItem(
        "currentQuestionIndex"
      );

      localStorage.setItem(
        "currentQuestionIndex",
        Number(storedCurrentQuestionIndex) + 1
      );

      setCurrentQuestionIndex(Number(storedCurrentQuestionIndex) + 1);
    }
  };
  useEffect(() => {
    startTest();
  }, []);

  if (testLoading) return <p>Loading test...</p>;
  if (testError) return <p>Error: {testError.message}</p>;

  async function handleNext() {
    setIsLoading(true);
    await createQuestionResult(createQuestionResultDto());

    try {
      if (currentQuestionIndex < test.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        localStorage.setItem("currentQuestionIndex", currentQuestionIndex + 1);
      } else {
        setIsTestCompleted(true);
        localStorage.removeItem("currentQuestionIndex");
        localStorage.removeItem("testResultId");
      }
    } catch (error) {
      setError(error.message || "Ошибка при отправке ответа");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isTestCompleted) {
    return (
      <TestResult
        testResultId={testResultId}
        startTest={startTest}
      ></TestResult>
    );
  }

  return (
    <div>
      <h2>Тест</h2>
      <div>
        <h3>{test.questions[currentQuestionIndex].content}</h3>
        {test.questions[currentQuestionIndex].answerOptions.map((answer) => (
          <div key={answer.id}>
            <label>
              <input
                type="checkbox"
                value={answer.id}
                onChange={(e) => {
                  const updatedSelectedAnswers = [...selectedAnswers];
                  const answerData = {
                    id: answer.id,
                    isCorrect: answer.isCorrect,
                  };

                  if (e.target.checked) {
                    updatedSelectedAnswers.push(answerData);
                  } else {
                    const index = updatedSelectedAnswers.findIndex(
                      (item) => item.id === answer.id
                    );
                    if (index > -1) {
                      updatedSelectedAnswers.splice(index, 1);
                    }
                  }
                  setSelectedAnswers(updatedSelectedAnswers);
                }}
              />
              <span>{answer.value}</span>
              {answer.isCorrect ? (
                <span className="text-green-500"> (Правильный ответ)</span>
              ) : (
                <span className="text-red-500"> (Неправильный ответ)</span>
              )}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleNext}>Дальше</button>
    </div>
  );
};

export default TestPage;
