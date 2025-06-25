"use client";
import { useParams } from "next/navigation";
import testResultService from "../components/services/testResultService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import Link from "next/link";

const TestResult = ({ testResultId, startTest }) => {
  const {
    data: testResult,
    error: testResultError,
    isLoading: testResultLoading,
  } = testResultService.useGetTestResultById(testResultId);

  if (testResultLoading)
    return (
      <div className="text-center text-lg text-blue-600 font-semibold py-8">
        Загрузка...
      </div>
    );
  if (testResultError)
    return (
      <div className="text-center text-lg text-red-600 font-semibold py-8">
        Ошибка при загрузке результатов теста.
      </div>
    );

  return (
    <div className="container mx-auto px-4 max-w-6xl m-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center mb-2">
            Результаты
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6 mt-2">
            {testResult.questionResults.map((questionResult, index) => {
              const question = questionResult.question;
              const userAnswers = questionResult.userAnswerOptions.map(
                (option) => option.value
              );
              const correctAnswers = testResult.test.questions
                .find((q) => q.id === question.id)
                .answerOptions.filter((option) => option.isCorrect)
                .map((option) => option.value);
              const allAnswers = testResult.test.questions.find(
                (q) => q.id === question.id
              ).answerOptions;
              const isCorrect =
                userAnswers.length > 0 &&
                correctAnswers.length === userAnswers.length &&
                correctAnswers.every((answer) => userAnswers.includes(answer));
              return (
                <Card
                  key={index}
                  className={`bg-zinc-900 shadow rounded-xl p-4 ${
                    isCorrect ? "border-green-600" : "border-red-600"
                  }`}
                >
                  <div className="flex flex-col ">
                    <div className="font-semibold text-lg text-white mb-1">
                      {index + 1}. {question.content}
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      {allAnswers.map((answer) => {
                        const isChecked = userAnswers.includes(answer.value);
                        const isAnswerCorrect = answer.isCorrect;
                        return (
                          <div
                            key={answer.id}
                            className={`flex items-center gap-1 p-2 rounded-lg ${
                              isAnswerCorrect
                                ? "bg-green-950/40"
                                : isChecked
                                ? "bg-red-950/40"
                                : "bg-zinc-800/40"
                            }`}
                          >
                            <Checkbox
                              checked={isChecked}
                              disabled
                              className="border-zinc-600"
                            />
                            <span className="text-base text-white">
                              {answer.value}
                            </span>
                            <span
                              className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold`}
                            ></span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="flex justify-center mt-8">
            <Button className="mx-auto" onClick={startTest}>
              Пройти тест снова
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  description: {
    textAlign: "center",
    color: "#666",
    marginBottom: "20px",
  },
  questionsContainer: {
    marginTop: "20px",
  },
  questionCard: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "15px",
    marginBottom: "15px",
  },
  questionContent: {
    fontWeight: "bold",
    color: "#333",
  },
  userAnswers: {
    color: "#555",
  },
  correctAnswers: {
    color: "#555",
  },
  result: {
    fontWeight: "bold",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#ff0000",
  },
  error: {
    textAlign: "center",
    fontSize: "18px",
    color: "#ff0000",
  },
  retryButton: {
    display: "block",
    margin: "20px auto",
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "#fff",
    textAlign: "center",
    borderRadius: "5px",
    textDecoration: "none",
  },
};

export default TestResult;
