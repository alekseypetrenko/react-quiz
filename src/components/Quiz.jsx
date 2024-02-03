import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompletedImage from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(answer) {
      setAnswerState("answered");
      setUserAnswers((prevAnswer) => [...prevAnswer, answer]);

      setTimeout(() => {
        if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompletedImage} alt="Quiz completed" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffleAnswers.sort((a, b) => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div className="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={30000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffleAnswers.map((answer) => {
            let cssClasses = "";
            const isSelected = userAnswers[userAnswers.length - 1] === answer;

            if (answerState === "answered" && isSelected) {
              cssClasses = "selected";
            }

            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClasses = answerState;
            }
            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClasses}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
