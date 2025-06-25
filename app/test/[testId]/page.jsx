"use client";
import { useParams } from "next/navigation";
import testsService from "../../../components/services/testsService";
import testResultsService from "../../../components/services/testResultService";
import { useState, useEffect } from "react";
import TestResult from "@/components/testResult";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import Loadiing from "@/components/loading";

const TestPage = () => {
  const { testId } = useParams();
  const userId = 1016;
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
      // localStorage.setItem("testResultId", storedTestResultId);
      // localStorage.setItem("currentQuestionIndex", 0);
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

  if (testLoading)
    return (
      <p>
        <Loadiing></Loadiing>
      </p>
    );
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
    return (
      <div>
        <Loadiing></Loadiing>
      </div>
    );
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
    <div className="container mx-auto px-4 max-w-2xl py-8">
      <Card className="w-fit mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl sm:text-4xl font-extrabold text-center mt-4">
            {test.name}
          </CardTitle>
          <CardDescription className="text-center text-lg mb-2">
            Вопрос {currentQuestionIndex + 1} из {test.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-xl font-bold text-center">
            {test.questions[currentQuestionIndex].content}
          </div>
          <div className="flex flex-col gap-3">
            {test.questions[currentQuestionIndex].answerOptions.map(
              (answer) => (
                <label
                  key={answer.id}
                  className="flex items-center gap-2 p-3 rounded hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <Checkbox
                    checked={selectedAnswers.some((a) => a.id === answer.id)}
                    onCheckedChange={(checked) => {
                      const updatedSelectedAnswers = [...selectedAnswers];
                      const answerData = {
                        id: answer.id,
                        isCorrect: answer.isCorrect,
                      };
                      if (checked) {
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
                  <span className="text-base">{answer.value}</span>
                </label>
              )
            )}
          </div>
          <div className="flex justify-center mt-8">
            <Button
              className="px-8 py-2 text-lg font-bold"
              onClick={handleNext}
            >
              {currentQuestionIndex < test.questions.length - 1
                ? "Дальше"
                : "Завершить тест"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestPage;
