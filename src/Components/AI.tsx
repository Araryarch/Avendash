import React, { useEffect, useState, useRef } from 'react'
import { main } from '../ai'
import useDebounce from '../hooks/useDebounce'
import { gsap } from 'gsap'

const Ai = () => {
  const [userMessage, setUserMessage] = useState<string>('')
  const [result, setResult] = useState<string | undefined>('')
  const { debounce } = useDebounce()

  useEffect(() => {
    const fetchData = async () => {
      if (userMessage.trim() !== '') {
        const newResult = await main(userMessage)
        setResult(newResult)
      }
    }
    const debouncedFetchData = debounce(fetchData, 10000000)
    debouncedFetchData()
  }, [userMessage, debounce])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (userMessage.trim() !== '') {
      const newResult = await main(userMessage)
      setResult(newResult)
    }
  }

  const ai = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      ai.current,
      { opacity: 0, x: 200 },
      { opacity: 1, x: 0, duration: 2 },
    )
  }, [])

  return (
    <form
      ref={ai}
      className="chat-wrapper bg-based-100 flex min-h-[80%] grid-rows-2 flex-col items-start justify-start gap-5 rounded-box p-5 pb-10 text-xl text-secondary-content shadow-sm shadow-primary xl:h-3/4"
      onSubmit={handleSubmit}
    >
      <h1 className="rounded-md bg-primary p-2 px-4 text-2xl font-bold text-primary-content shadow-md shadow-primary transition-all duration-200 hover:shadow-sm">
        Avendash AI
      </h1>
      <div className="ai-answer box-border flex h-full w-full select-text overflow-auto rounded-box bg-secondary-content bg-opacity-85 p-5 pb-32 font-semibold text-primary xl:pb-10">
        <span className="pr-2 text-secondary">&gt;</span>
        {result}
      </div>
      <div className="ai-form flex w-full flex-1 gap-1 rounded-md">
        <input
          type="text"
          placeholder="Tanya disini bro"
          className="input input-bordered w-full text-sm font-semibold text-primary xl:text-xl"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button className="btn" type="submit">
          Send
        </button>
      </div>
    </form>
  )
}

export default Ai
