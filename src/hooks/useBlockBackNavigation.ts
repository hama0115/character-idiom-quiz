import { useEffect } from 'react'

/**
 * Android の戻る操作（画面端スワイプ・ナビゲーションバー）でアプリが終了するのを防ぐ。
 * 履歴にダミーを 1 つ積んでおき、戻られたら積み直して相殺する。
 */
export function useBlockBackNavigation() {
  useEffect(() => {
    const pushGuard = () => {
      window.history.pushState(null, '', window.location.href)
    }

    pushGuard()
    window.addEventListener('popstate', pushGuard)
    return () => window.removeEventListener('popstate', pushGuard)
  }, [])
}
