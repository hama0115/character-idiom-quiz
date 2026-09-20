import { describe, expect, it } from 'vitest'
import { SECTION_COMPOSITION } from '../quiz/selectQuestions'
import { charsOf, correctCharOf, type Level } from '../quiz/types'
import { ALL_QUESTIONS } from './questions'

const LEVELS: Level[] = ['normal', 'hard', 'veryHard']

/**
 * 問題データは手で書くため、入力ミスが必ず起きる。
 * 「正解の選択肢が無い問題」を祖父が引くのがこのアプリで最悪の事故なので、
 * 構造の不備はここで全部落とす。
 */
describe('idioms.json', () => {
  it('1 問以上ある', () => {
    expect(ALL_QUESTIONS.length).toBeGreaterThan(0)
  })

  it('id が重複していない', () => {
    const ids = ALL_QUESTIONS.map((question) => question.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('難易度ごとの在庫が、1 セクションの配分を満たしている', () => {
    for (const level of LEVELS) {
      const stock = ALL_QUESTIONS.filter((question) => question.level === level).length
      expect(stock, `${level} の問題数`).toBeGreaterThanOrEqual(SECTION_COMPOSITION[level])
    }
  })

  describe.each(ALL_QUESTIONS)('$id ($idiom)', (question) => {
    it('四字熟語がちょうど 4 文字', () => {
      expect(charsOf(question.idiom)).toHaveLength(4)
    })

    it('blankIndex が 0〜3 の範囲にある', () => {
      expect(question.blankIndex).toBeGreaterThanOrEqual(0)
      expect(question.blankIndex).toBeLessThanOrEqual(3)
    })

    it('選択肢がちょうど 4 つある', () => {
      expect(question.choices).toHaveLength(4)
    })

    it('選択肢に正解が含まれている', () => {
      expect(question.choices).toContain(correctCharOf(question))
    })

    it('選択肢が重複していない', () => {
      expect(new Set(question.choices).size).toBe(question.choices.length)
    })

    it('選択肢がすべて 1 文字', () => {
      for (const choice of question.choices) {
        expect(charsOf(choice), `選択肢「${choice}」`).toHaveLength(1)
      }
    })

    it('読みと意味が空でない', () => {
      expect(question.reading.length).toBeGreaterThan(0)
      expect(question.meaning.length).toBeGreaterThan(0)
    })

    it('level が正しい値', () => {
      expect(LEVELS).toContain(question.level)
    })
  })
})
