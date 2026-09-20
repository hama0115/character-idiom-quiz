export type Level = 'normal' | 'hard' | 'veryHard'

export type Question = {
  id: string
  /** 穴あきにする前の、完成した四字熟語 */
  idiom: string
  reading: string
  /** idiom の何文字目を穴にするか（0 始まり） */
  blankIndex: number
  /** 正解を 1 つ含む 4 つの選択肢。表示時にシャッフルする */
  choices: string[]
  /** 不正解のときに表示する一行の意味 */
  meaning: string
  level: Level
}

/**
 * 「𠮟」のようなサロゲートペアの漢字でも 1 文字として扱うため、
 * idiom[i] ではなく Array.from で分解してから取り出す。
 */
export function charsOf(idiom: string): string[] {
  return Array.from(idiom)
}

/** 正解はデータに持たせず、常に idiom と blankIndex から導出する */
export function correctCharOf(question: Question): string {
  return charsOf(question.idiom)[question.blankIndex]
}
