'use client'

import { useState, useRef, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa'

const Quiz = ({ questions }) => {
  const scoreRef = useRef(null)
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
    } else if (!selectedAnswer) {
      setProgress((prevProgress) => ({
        ...prevProgress,
        invalid: prevProgress.invalid + 1,
      }))
      setAnswerHistory((prevHistory) => [
        ...(prevHistory = prevHistory.slice(1)),
      ])
    } else {
      setProgress((prevProgress) => ({
        ...prevProgress,
        false: prevProgress.false + 1,
        currentQuestion: prevProgress.currentQuestion + 1,
      }))
      setAnswerHistory((prevHistory) => [
        ...(prevHistory = prevHistory.slice(1)),
      ])
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

  if (progress.currentQuestion === questions.length) {
    const percent = (progress.true / progress.currentQuestion) * 100
    scoreRef.current = percent
  }

  return (
    <div className="w-4/5 mx-auto bg-slate-100 text-slate-800 rounded-lg border-black/80 border-2 flex flex-col">
      <div className="w-full min-h-fit mx-auto text-center font-bold text-3xl flex justify-center items-center">
        {scoreRef.current && (
          <div className="">
            <h1>Score %{scoreRef.current}</h1>
            <button className="" onClick={() => window.location.reload()}>
              Start Again!
            </button>
          </div>
        )}
      </div>
      <div>
        {questions.map((question, index) => {
          if (index !== progress.currentQuestion) return null

          return (
            <div
              key={index}
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
                  onClick={() => {
                    handlePrevBtn(question)
                    setAnswerHistory((prevHistory) => [
                      ...(prevHistory = prevHistory.slice(1)),
                    ])
                  }}
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
    </div>
  )
}
export default Quiz
