import { useState, useEffect } from "react";

function App() {
  const [color, setColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}`
  );
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(0);

  useEffect(() => {
    createAnswers();
  }, [answered]);

  const generateNewColor = () => {
    setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  };

  const createAnswers = () => {
    // generate 3 wrong answers and 1 correct answer
    let answers = [
      color,
      `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    ];

    // re-shuffle all answers so the correct answer is not always the first one
    answers = answers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    console.log(answers);
    setAnswers(answers);
  };

  const handleClickedAnswer = (answer) => {
    if (answer === color) {
      setCorrect((prev) => prev + 1);
      setAnswered((prev) => prev + 1);
      generateNewColor();
    } else {
      setAnswered((prev) => prev + 1);
      generateNewColor();
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#F2F2F2]">
      <div className="flex flex-col gap-4 wrapper w-full md:w-[800px] py-16 px-10">
        <div className="flex flex-col gap-8 justify-center items-center">
          <span className="uppercase tracking-wide text-4xl md:text-7xl font-black text-[#333333]">
            Guess the color
          </span>
          <div className="flex justify-between items-center w-full">
            <span className="uppercase text-xs bg-[#e7e7e7] border border-[#c8c8c8] rounded-full px-3 py-1 font-semibold">
              Answered: {answered}
            </span>
            <span className="uppercase text-xs bg-[#e7e7e7] border border-[#c8c8c8] rounded-full px-3 py-1 font-semibold">
              Correct: {correct}
            </span>
          </div>
        </div>
        <div
          style={{ backgroundColor: `${color}` }}
          className="w-full h-[350px] rounded-sm shadow-md border"
        ></div>
        <div className="answers grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}

export default App;
