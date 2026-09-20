import { correctCharOf, type Question } from './types'

export type Phase =
  /** タイトル画面 */
  | { type: 'title' }
  /** 回答待ち。選択肢がタップできる唯一の状態 */
  | { type: 'answering' }
  /** ◯✕ を表示中。選択肢のタップは受け付けない */
  | { type: 'judging'; selected: string; isCorrect: boolean }
  /** 結果画面 */
  | { type: 'finished' }

/** 出題中（タイトルでも結果でもない）の状態。問題画面に渡す */
export type PlayingPhase = Extract<Phase, { type: 'answering' | 'judging' }>

export type QuizState = {
  questions: Question[]
  currentIndex: number
  correctCount: number
  phase: Phase
}

export type QuizAction =
  | { type: 'start'; questions: Question[] }
  | { type: 'answer'; choice: string }
  | { type: 'next' }

export const initialState: QuizState = {
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  phase: { type: 'title' },
}

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'start':
      return {
        questions: action.questions,
        currentIndex: 0,
        correctCount: 0,
        phase: { type: 'answering' },
      }

    case 'answer': {
      // 判定中の連打で二重に採点されるのを防ぐ
      if (state.phase.type !== 'answering') return state

      const question = state.questions[state.currentIndex]
      if (!question) return state

      const isCorrect = action.choice === correctCharOf(question)
      return {
        ...state,
        correctCount: state.correctCount + (isCorrect ? 1 : 0),
        phase: { type: 'judging', selected: action.choice, isCorrect },
      }
    }

    case 'next': {
      if (state.phase.type !== 'judging') return state

      const nextIndex = state.currentIndex + 1
      if (nextIndex >= state.questions.length) {
        return { ...state, phase: { type: 'finished' } }
      }
      return { ...state, currentIndex: nextIndex, phase: { type: 'answering' } }
    }
  }
}
