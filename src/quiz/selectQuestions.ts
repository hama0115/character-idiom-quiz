import { shuffle } from './shuffle'
import type { Level, Question } from './types'

export const QUESTIONS_PER_SECTION = 10

/** 1 セクションの難易度配分。データを増やしてもこの比率で出題される */
export const SECTION_COMPOSITION: Record<Level, number> = {
  normal: 4,
  hard: 4,
  veryHard: 2,
}

/**
 * 難易度の配分を守って 1 セクション分を選び、最後に出題順をシャッフルする。
 * ある難易度の在庫が足りない場合は、残りの問題から埋めてセクションを成立させる。
 */
export function selectQuestions(
  pool: readonly Question[],
  count: number = QUESTIONS_PER_SECTION,
): Question[] {
  const picked: Question[] = []

  for (const [level, quota] of Object.entries(SECTION_COMPOSITION)) {
    const candidates = shuffle(pool.filter((question) => question.level === level))
    picked.push(...candidates.slice(0, quota))
  }

  if (picked.length < count) {
    const pickedIds = new Set(picked.map((question) => question.id))
    const rest = shuffle(pool.filter((question) => !pickedIds.has(question.id)))
    picked.push(...rest.slice(0, count - picked.length))
  }

  return shuffle(picked.slice(0, count))
}
