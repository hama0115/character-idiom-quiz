type Props = {
  onStart: () => void
}

export function StartScreen({ onStart }: Props) {
  return (
    <div className="screen screen--centered">
      <h1 className="title">四字熟語クイズ</h1>
      <button type="button" className="big-button" onClick={onStart}>
        はじめる
      </button>
    </div>
  )
}
