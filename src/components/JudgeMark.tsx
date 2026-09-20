type Props = {
  kind: 'correct' | 'wrong'
}

/**
 * 音が出せないので、判定はこの ◯✕ だけで伝える。
 * 大きく描いたあと、うっすら残す（CSS の judge-mark アニメーション）。
 * pathLength="1" にしておくと、線の長さに関係なく dasharray 1 で描画アニメーションが書ける。
 */
export function JudgeMark({ kind }: Props) {
  return (
    <div className={`judge-mark judge-mark--${kind}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" fill="none" strokeLinecap="round">
        {kind === 'correct' ? (
          <circle className="judge-stroke" cx="50" cy="50" r="38" pathLength="1" />
        ) : (
          <>
            <line className="judge-stroke" x1="22" y1="22" x2="78" y2="78" pathLength="1" />
            <line
              className="judge-stroke judge-stroke--second"
              x1="78"
              y1="22"
              x2="22"
              y2="78"
              pathLength="1"
            />
          </>
        )}
      </svg>
    </div>
  )
}
