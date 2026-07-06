import { useEffect } from 'react'

export default function usePageTitle(title) {
  useEffect(() => {
    if (!title) return undefined
    const previousTitle = document.title
    document.title = `${title} | iTech Alumni`
    return () => {
      document.title = previousTitle
    }
  }, [title])
}
