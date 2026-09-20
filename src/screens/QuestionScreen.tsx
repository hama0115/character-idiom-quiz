import { useEffect, useMemo } from 'react'
import { ChoiceButton, type ChoiceVariant } from '../components/ChoiceButton'
import { IdiomDisplay } from '../components/IdiomDisplay'
import { JudgeMark } from '../components/JudgeMark'
import { CORRECT_ADVANCE_MS } from '../config'
import type { PlayingPhase } from '../quiz/reducer'
import { shuffle } from '../quiz/shuffle'
import { correctCharOf, type Question } from '../quiz/types'

type Props = {
  question: Question
  questionNumber: number
  totalQuestions: number
  phase: PlayingPhase
  onAnswer: (choice: string) => void
  onNext: () => void
}

export function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  phase,
  onAnswer,
  onNext,
}: Props) {
  // 問題が変わったときだけ並べ替える。毎回のレンダリングで動くと選択肢が踊ってしまう
  const choices = useMemo(() => shuffle(question.choices), [question])
  const correctChar = correctCharOf(question)
  const judging = phase.type === 'judging' ? phase : null

  useEffect(() => {
    if (!judging?.isCorrect) return
    const timer = window.setTimeout(onNext, CORRECT_ADVANCE_MS)
    return () => window.clearTimeout(timer)
  }, [judging, onNext])

  const variantOf = (char: string): ChoiceVariant => {
    if (!judging) return 'default'
    if (char === correctChar) return 'correct'
    if (char === judging.selected) return 'wrong'
    return 'dimmed'
  }

  return (
    <div className="screen question-screen">
      <header className="progress">
        {questionNumber}もんめ / {totalQuestions}もん
      </header>

      <main className="stage">
        <IdiomDisplay
          idiom={question.idiom}
          blankIndex={question.blankIndex}
          revealed={judging !== null}
        />
        {/* 間違えたときだけ意味を出す。空でも高さを確保して画面を動かさない */}
        <p className="meaning">{judging && !judging.isCorrect ? question.meaning : ''}</p>
      </main>

      <div className="choices">
        {choices.map((char) => (
          <ChoiceButton
            key={char}
            char={char}
            variant={variantOf(char)}
            disabled={judging !== null}
            onSelect={onAnswer}
          />
        ))}
      </div>

      <footer className="actionbar">
        {judging && !judging.isCorrect && (
          <button type="button" className="big-button" onClick={onNext}>
            つぎへ
          </button>
        )}
      </footer>

      {judging && <JudgeMark kind={judging.isCorrect ? 'correct' : 'wrong'} />}
    </div>
  )
}
