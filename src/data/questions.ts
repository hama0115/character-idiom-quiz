import type { Question } from '../quiz/types'
import rawIdioms from './idioms.json'

/**
 * JSON からの読み込みは型がゆるい（level が string になる）ため、ここで一度だけ
 * Question[] として扱う。中身が本当に正しいかは idioms.test.ts で検証する。
 */
export const ALL_QUESTIONS = rawIdioms as Question[]
