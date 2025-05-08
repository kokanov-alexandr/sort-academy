"use client";
import { useState } from "react";
import testsService from "../../../serviсes/testsService";
import sortingsService from "../../../serviсes/sortingsService";

const CreateTest = ({}) => {
  const {
    data: sortings,
    error: sortingsError,
    isLoading: sortingsLoading,
  } = sortingsService.useGetSortings();

  const {
    trigger: createTest,  
    error: createError,
    isMutating,
  } = testsService.useCreateTest();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sortingId: 0,
  });

  const [questions, setQuestions] = useState([]);

  if (sortingsLoading) return <p>Loading sortings...</p>;
  if (sortingsError) return <p>Error: {testsError.message}</p>;

  const handleCreateTest = async () => {
    try {
      await createTest({
        name: formData.name,
        description: formData.description,
        sorting: {
          id: Number(formData.sortingId),
        },
        questions: questions.map((q) => ({
          content: q.text,
          answerOptions: q.answers.map((a) => ({
            value: a.text,
            isCorrect: a.isCorrect,
          })),
        })),
      });

      setFormData({
        name: "",
        description: "",
        sortingId: 0,
      });
      setQuestions([]);
    } catch (error) {
      console.error("Failed to create test:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addQuestion = () => {
    const newQuestion = { id: Date.now(), text: "", answers: [] };
    setQuestions([...questions, newQuestion]);
  };

  const addAnswer = (questionId) => {
    const newAnswer = { id: Date.now(), text: "", isCorrect: false };
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, answers: [...q.answers, newAnswer] } : q
      )
    );
  };

  const handleAnswerChange = (questionId, answerId, text) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a) =>
                a.id === answerId ? { ...a, text } : a
              ),
            }
          : q
      )
    );
  };

  const toggleCorrectAnswer = (questionId, answerId) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a) =>
                a.id === answerId ? { ...a, isCorrect: !a.isCorrect } : a
              ),
            }
          : q
      )
    );
  };

  const removeAnswer = (questionId, answerId) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.filter((a) => a.id !== answerId),
            }
          : q
      )
    );
  };

  const handleQuestionChange = (id, text) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
    console.log(questions);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div>
      <h1>Создание теста</h1>
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Имя"
          disabled={isMutating}
        />
        <br />
        <br />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Описание"
          disabled={isMutating}
        />
        <br />
        <br />
        <select
          name="sortingId"
          id="sorting"
          value={formData.sortingId}
          onChange={handleChange}
        >
          <option>Выберите сортировку</option>
          {sortings.map((option) => (
            <option key={option.id} value={option.id}>
              {option.displayName}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button onClick={handleCreateTest} disabled={isMutating}>
          {isMutating ? "Creating..." : "Create Test"}
        </button>
        {createError && <p>Error creating test: {createError.message}</p>}
      </div>
      <button onClick={addQuestion}>Добавить вопрос</button>
      {questions.length > 0 &&
        questions.map((question) => (
          <div key={question.id}>
            <input
              type="text"
              value={question.text}
              onChange={(e) =>
                handleQuestionChange(question.id, e.target.value)
              }
              placeholder="Введите вопрос"
            />
            <button onClick={() => removeQuestion(question.id)}>
              Удалить вопрос
            </button>
            <button onClick={() => addAnswer(question.id)}>
              Добавить вариант ответа
            </button>
            {question.answers &&
              question.answers.map((answer) => (
                <div key={answer.id}>
                  <input
                    type="text"
                    value={answer.text}
                    onChange={(e) =>
                      handleAnswerChange(question.id, answer.id, e.target.value)
                    }
                    placeholder="Введите вариант ответа"
                  />
                  <input
                    type="checkbox"
                    checked={answer.isCorrect}
                    onChange={() => toggleCorrectAnswer(question.id, answer.id)}
                  />
                  <span>Правильный ответ</span>
                  <button onClick={() => removeAnswer(question.id, answer.id)}>
                    Удалить вариант
                  </button>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default CreateTest;
