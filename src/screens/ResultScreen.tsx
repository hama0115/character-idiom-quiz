type Props = {
  correctCount: number
  totalQuestions: number
  onRestart: () => void
}

export function ResultScreen({ correctCount, totalQuestions, onRestart }: Props) {
  return (
    <div className="screen screen--centered">
      <p className="result-lead">{totalQuestions}もんちゅう</p>
      <p className="result-score">
        <span className="result-score-number">{correctCount}</span>もん せいかい
      </p>
      <button type="button" className="big-button" onClick={onRestart}>
        もういっかい
      </button>
    </div>
  )
}
