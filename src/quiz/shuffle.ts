/**
 * Fisher-Yates によるシャッフル。
 * sort(() => Math.random() - 0.5) は並びに偏りが出るうえ、比較関数として不正なので使わない。
 */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}
