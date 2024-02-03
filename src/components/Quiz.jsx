import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompletedImage from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  function handleSelectAnswer(answer) {
    setUserAnswers((prevAnswer) => [...prevAnswer, answer]);
  }

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
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffleAnswers.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
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
