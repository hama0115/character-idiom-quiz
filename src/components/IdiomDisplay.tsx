import { charsOf } from '../quiz/types'

type Props = {
  idiom: string
  blankIndex: number
  /**
   * 判定後は、正解・不正解にかかわらず必ず正解の文字を見せる。
   * 表示する色は常に緑（正解の色）。間違えたときに赤で出すと、
   * 正解の文字そのものが「誤り」に見えてしまう。
   */
  revealed: boolean
}

export function IdiomDisplay({ idiom, blankIndex, revealed }: Props) {
  return (
    <div className="idiom">
      {charsOf(idiom).map((char, index) => {
        if (index !== blankIndex) {
          return (
            <span key={index} className="idiom-char">
              {char}
            </span>
          )
        }

        // 穴の中にも正解の文字を置いておき、透明にしておく。
        // こうすると表示した瞬間に文字幅が変わらず、画面が動かない。
        return (
          <span
            key={index}
            className={`idiom-char idiom-char--blank${revealed ? ' is-revealed' : ''}`}
          >
            {char}
          </span>
        )
      })}
    </div>
  )
}
