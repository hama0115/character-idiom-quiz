import { describe, expect, it } from 'vitest'
import { ALL_QUESTIONS } from '../data/questions'
import { QUESTIONS_PER_SECTION, SECTION_COMPOSITION, selectQuestions } from './selectQuestions'
import type { Level, Question } from './types'

const countByLevel = (questions: Question[], level: Level) =>
  questions.filter((question) => question.level === level).length

/** 難易度の在庫が偏ったプールを作って、フォールバックの挙動を確かめる */
const normalOnlyPool: Question[] = Array.from({ length: 12 }, (_, index) => ({
  id: `dummy-${index}`,
  idiom: '一二三四',
  reading: 'てすと',
  blankIndex: 0,
  choices: ['一', '二', '三', '四'],
  meaning: 'テスト用',
  level: 'normal',
}))

describe('selectQuestions', () => {
  it('1 セクション分の問題数を返す', () => {
    expect(selectQuestions(ALL_QUESTIONS)).toHaveLength(QUESTIONS_PER_SECTION)
  })

  it('難易度の配分を守る', () => {
    const selected = selectQuestions(ALL_QUESTIONS)
    for (const level of Object.keys(SECTION_COMPOSITION) as Level[]) {
      expect(countByLevel(selected, level), level).toBe(SECTION_COMPOSITION[level])
    }
  })

  it('同じ問題を 2 回出さない', () => {
    const ids = selectQuestions(ALL_QUESTIONS).map((question) => question.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('難易度が偏っていても、残りの問題で 1 セクション分を埋める', () => {
    const selected = selectQuestions(normalOnlyPool)
    expect(selected).toHaveLength(QUESTIONS_PER_SECTION)
    expect(new Set(selected.map((question) => question.id)).size).toBe(QUESTIONS_PER_SECTION)
  })
})
