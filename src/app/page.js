import Quiz from '../components/Quiz'
import QUESTIONS from '../components/questions'

function App() {
  return (
    <div className="App bg-blue-300 flex justify-center items-center">
      <Quiz questions={QUESTIONS} />
    </div>
  )
}

export default App
