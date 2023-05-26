import { useState, useEffect } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";

function App() {
  const [color, setColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}`
  );
  const [answers, setAnswers] = useState([]);
  const [correctlyAnswered, setCorrectlyAnswered] = useState(0);
  const [answered, setAnswered] = useState(0);

  useEffect(() => {
    generateAnswers();
  }, [answered]);

  const nextQuestion = () => {
    setAnswered((prev) => prev + 1); // increased answered count
    setColor(generateRandomColor()); // generates new color
  };

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const generateAnswers = () => {
    // re-shuffles answers in array (array contains correct answer and random answer)
    let answers = [color, generateRandomColor()]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setAnswers(answers); // saves answers in state
  };

  const handleClickedAnswer = (answer) => {
    if (answer === color) {
      setCorrectlyAnswered((prev) => prev + 1); // increments correct counter
      nextQuestion();
    }
    return nextQuestion();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#F2F2F2]">
      <div className="flex flex-col gap-4 wrapper w-full md:w-[800px] py-16 px-10">
        <div className="flex flex-col gap-8 justify-center items-center">
          <span className="uppercase tracking-wide text-4xl md:text-7xl font-black text-[#333333]">
            Guess the color
          </span>
        </div>
        <div
          style={{ backgroundColor: `${color}` }}
          className="w-full h-[350px] rounded-sm shadow-md border border-[#c8c8c8]"
        ></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {answers.map((answer, index) => {
            return (
              <button
                onClick={() => handleClickedAnswer(answer)}
                key={index}
                className="bg-[#e7e7e7] border border-[#c8c8c8] hover:bg-[#c8c8c8] transition-all text-[#333333] p-4 rounded-sm shadow-sm uppercase font-bold"
              >
                {answer}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between items-center w-full">
          <span className="flex gap-2 items-center">
            <span>
              <MdOutlineQuiz size={24} />
            </span>
            <span>You've answered</span>
            <span className="uppercase text-xs bg-[#e7e7e7] border border-[#c8c8c8] rounded-full px-3 py-1 font-semibold">
              {answered}
            </span>
            <span>{answered !== 1 ? "questions" : "question"}</span>
          </span>
          <span className="flex gap-2 items-center">
            <FaRegThumbsUp size={24} />
            <span>You've guessed</span>
            <span className="uppercase text-xs bg-[#e7e7e7] border border-[#c8c8c8] rounded-full px-3 py-1 font-semibold">
              {correctlyAnswered}
            </span>
            <span>correctly</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
