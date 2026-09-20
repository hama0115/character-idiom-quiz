import { useEffect } from 'react'

/**
 * 考えている間に画面が暗くなるのを防ぐ。
 * 画面が消えると「壊れた」と受け取られるおそれがあるため、遊んでいる間は点けたままにする。
 */
export function useWakeLock() {
  useEffect(() => {
    let sentinel: WakeLockSentinel | null = null
    let cancelled = false

    const request = async () => {
      if (!('wakeLock' in navigator)) return
      try {
        const next = await navigator.wakeLock.request('screen')
        if (cancelled) {
          void next.release()
          return
        }
        sentinel = next
      } catch {
        // 省電力モードなどでは取得できない。クイズの動作そのものには影響しない
      }
    }

    // 一度画面を消したり他アプリに移ると解除されるので、戻ってきたら取り直す
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') void request()
    }

    void request()
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibilityChange)
      void sentinel?.release()
    }
  }, [])
}
