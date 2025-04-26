"use client";
import { useParams } from "next/navigation";
import testResultsService from "../serviсes/testResultService";
import Link from "next/link";

const TestResult = ({ testResultId, startTest }) => {
  const {
    data: testResult,
    error: testResultError,
    isLoading: testResultLoading,
  } = testResultsService.useGetTestResultById(testResultId);

  if (testResultLoading) return <div style={styles.loading}>Загрузка...</div>;
  if (testResultError)
    return (
      <div style={styles.error}>Ошибка при загрузке результатов теста.</div>
    );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{testResult.test.name}</h1>
      <h2 style={styles.description}>{testResult.test.description}</h2>
      <div style={styles.questionsContainer}>
        {testResult.questionResults.map((questionResult, index) => {
          const question = questionResult.question;
          const userAnswers = questionResult.userAnswerOptions.map(
            (option) => option.value
          );
          const correctAnswers = testResult.test.questions
            .find((q) => q.id === question.id)
            .answerOptions.filter((option) => option.isCorrect)
            .map((option) => option.value);

          const isCorrect = correctAnswers.every((answer) =>
            userAnswers.includes(answer)
          );

          return (
            <div key={index} style={styles.questionCard}>
              <h3 style={styles.questionContent}>{question.content}</h3>
              <p style={styles.userAnswers}>
                Ваши ответы:{" "}
                {userAnswers.length > 0 ? userAnswers.join(", ") : "Нет ответа"}
              </p>
              <p style={styles.correctAnswers}>
                Правильные ответы: {correctAnswers.join(", ")}
              </p>
              <p
                style={{ ...styles.result, color: isCorrect ? "green" : "red" }}
              >
                {isCorrect ? "Правильно!" : "Неправильно!"}
              </p>
            </div>
          );
        })}
      </div>
      <button style={styles.retryButton} onClick={startTest}>
        Пройти тест снова
      </button>
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
