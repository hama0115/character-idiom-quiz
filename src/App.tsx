import { useCallback, useReducer } from 'react'
import { ALL_QUESTIONS } from './data/questions'
import { useBlockBackNavigation } from './hooks/useBlockBackNavigation'
import { useWakeLock } from './hooks/useWakeLock'
import { initialState, quizReducer } from './quiz/reducer'
import { selectQuestions } from './quiz/selectQuestions'
import { QuestionScreen } from './screens/QuestionScreen'
import { ResultScreen } from './screens/ResultScreen'
import { StartScreen } from './screens/StartScreen'

export default function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  useBlockBackNavigation()
  useWakeLock()

  const start = useCallback(() => {
    dispatch({ type: 'start', questions: selectQuestions(ALL_QUESTIONS) })
  }, [])
  const answer = useCallback((choice: string) => dispatch({ type: 'answer', choice }), [])
  const next = useCallback(() => dispatch({ type: 'next' }), [])

  if (state.phase.type === 'title') {
    return <StartScreen onStart={start} />
  }

  if (state.phase.type === 'finished') {
    return (
      <ResultScreen
        correctCount={state.correctCount}
        totalQuestions={state.questions.length}
        onRestart={start}
      />
    )
  }

  return (
    <QuestionScreen
      question={state.questions[state.currentIndex]}
      questionNumber={state.currentIndex + 1}
      totalQuestions={state.questions.length}
      phase={state.phase}
      onAnswer={answer}
      onNext={next}
    />
  )
}
