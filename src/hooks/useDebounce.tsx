import { useRef } from 'react'

const useDebounce = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const debounce = (func: () => void, delay: number) => {
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
      debounceTimeout.current = setTimeout(() => {
        func()
        debounceTimeout.current = null
      }, delay)
    }
  }

  return { debounce }
}

export default useDebounce
