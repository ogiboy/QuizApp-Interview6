'use client'

import { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa'

const Quiz = ({ questions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answerHistory, setAnswerHistory] = useState(
    new Array(questions.length).fill(null)
  )
  const [progress, setProgress] = useState({
    currentQuestion: 0,
    true: 0,
    false: 0,
    invalid: 0,
  })

  const arrowBtnStyles = `w-11 h-8 hover:bg-slate-500 hover:text-slate-200 flex justify-center items-center rounded-2xl`

  const handleSelectAnswer = (id) => {
    setSelectedAnswer(id)
  }

  useEffect(() => {
    console.log('selected: ' + selectedAnswer)
    console.log('progress: ' + progress)
    console.log('history: ' + answerHistory)
  }, [selectedAnswer, progress, answerHistory])

  const handleOptions = (options) => {
    return options.map((option, index) => {
      const isSelected = selectedAnswer === index
      const isDisabled =
        index !== selectedAnswer &&
        answerHistory[progress.currentQuestion] !== null

      return (
        <div key={option} className="w-full h-10 my-3">
          <button
            onClick={() => handleSelectAnswer(index)}
            className={`w-full h-full rounded-lg border-black/80 border-2 hover:bg-slate-500 hover:text-slate-200 hover:underline decoration-solid ${
              selectedAnswer === index ? 'bg-slate-400' : ''
            } active:border-double`}
            disabled={isDisabled}
          >
            {option}
          </button>
        </div>
      )
    })
  }

  const handleAnswer = (question) => {
    if (selectedAnswer === question.correct) {
      setProgress((prevProgress) => ({
        ...prevProgress,
        true: prevProgress.true + 1,
        currentQuestion: prevProgress.currentQuestion + 1,
      }))
      alert('Doğru!')
    } else if (!selectedAnswer) {
      setProgress((prevProgress) => ({
        ...prevProgress,
        invalid: prevProgress.invalid + 1,
      }))
      alert('Hatalı tuşlama yaptınız.')
    } else {
      setProgress((prevProgress) => ({
        ...prevProgress,
        false: prevProgress.false + 1,
      }))
      alert('Yanlış cevap :(')
    }
    setSelectedAnswer(null)
    setAnswerHistory((prevHistory) => [question.correct, ...prevHistory])
  }

  const handlePrevBtn = () => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      currentQuestion: prevProgress.currentQuestion - 1,
    }))
    setSelectedAnswer(answerHistory[progress.currentQuestion - 1])
  }

  return (
    <div className="w-4/5 mx-auto my-32 bg-slate-100 text-slate-800 rounded-lg border-black/80 border-2 flex flex-col">
      <div className="w-full mx-auto text-center font-bold text-2xl">
        <h1>Score</h1>
      </div>
      <div className="w-4/5 h-7 flex justify-evenly items-center mx-auto my-2">
        <p>Correct: {progress.true}</p>
        <p>Wrong: {progress.false}</p>
        <p>Invalid: {progress.invalid}</p>
      </div>
      {questions.map((question, index) => {
        if (index !== progress.currentQuestion) return null

        return (
          <div
            key={index + 1}
            className="w-4/5 border-red-200 border-2 rounded-lg mx-auto my-8 p-10"
          >
            <h2 className="w-full flex justify-center mx-auto">
              {question.question}
            </h2>

            {handleOptions(questions[index].answers)}
            <div className="w-4/5 flex justify-evenly mx-auto">
              <button
                disabled={index === 0}
                className={arrowBtnStyles}
                onClick={() => handlePrevBtn(question)}
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={() => handleAnswer(question)}
                className={arrowBtnStyles}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Quiz
