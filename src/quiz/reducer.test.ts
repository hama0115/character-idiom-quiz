import { describe, expect, it } from 'vitest'
import { initialState, quizReducer, type QuizState } from './reducer'
import type { Question } from './types'

const question = (id: string, idiom: string, blankIndex: number): Question => ({
  id,
  idiom,
  reading: 'てすと',
  blankIndex,
  choices: ['甲', '乙', '丙', '丁'],
  meaning: 'テスト用',
  level: 'normal',
})

const questions = [question('q1', '一二三四', 0), question('q2', '五六七八', 3)]

/** questions を出題中で、1 問目の回答待ちの状態 */
const answering = (): QuizState =>
  quizReducer(initialState, { type: 'start', questions })

describe('quizReducer', () => {
  it('start で出題が始まり、スコアがリセットされる', () => {
    const state = answering()
    expect(state.phase.type).toBe('answering')
    expect(state.currentIndex).toBe(0)
    expect(state.correctCount).toBe(0)
  })

  it('正解すると correctCount が増え、judging に移る', () => {
    const state = quizReducer(answering(), { type: 'answer', choice: '一' })
    expect(state.correctCount).toBe(1)
    expect(state.phase).toEqual({ type: 'judging', selected: '一', isCorrect: true })
  })

  it('不正解では correctCount が増えないが、判定は記録される', () => {
    const state = quizReducer(answering(), { type: 'answer', choice: '乙' })
    expect(state.correctCount).toBe(0)
    expect(state.phase).toEqual({ type: 'judging', selected: '乙', isCorrect: false })
  })

  it('判定中に連打しても二重に採点されない', () => {
    const once = quizReducer(answering(), { type: 'answer', choice: '一' })
    const twice = quizReducer(once, { type: 'answer', choice: '一' })
    expect(twice.correctCount).toBe(1)
    expect(twice).toBe(once)
  })

  it('next で次の問題に進む', () => {
    const judged = quizReducer(answering(), { type: 'answer', choice: '一' })
    const next = quizReducer(judged, { type: 'next' })
    expect(next.currentIndex).toBe(1)
    expect(next.phase.type).toBe('answering')
  })

  it('回答待ちのまま next しても進まない', () => {
    const state = answering()
    expect(quizReducer(state, { type: 'next' })).toBe(state)
  })

  it('最後の問題に答えて next すると finished になる', () => {
    let state = answering()
    for (const choice of ['一', '八']) {
      state = quizReducer(state, { type: 'answer', choice })
      state = quizReducer(state, { type: 'next' })
    }
    expect(state.phase.type).toBe('finished')
    expect(state.correctCount).toBe(2)
  })

  it('finished から start すると、もう一度最初から遊べる', () => {
    let state = answering()
    state = quizReducer(state, { type: 'answer', choice: '一' })
    state = quizReducer(state, { type: 'next' })
    state = quizReducer(state, { type: 'answer', choice: '甲' })
    state = quizReducer(state, { type: 'next' })

    const restarted = quizReducer(state, { type: 'start', questions })
    expect(restarted.correctCount).toBe(0)
    expect(restarted.currentIndex).toBe(0)
    expect(restarted.phase.type).toBe('answering')
  })
})
