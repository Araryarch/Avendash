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
      <h1 className="p-2 px-4 text-2xl font-bold transition-all duration-200 rounded-md shadow-md bg-primary text-primary-content shadow-primary hover:shadow-sm">
        Avendash AI
      </h1>
      <div className="box-border flex w-full h-full p-5 pb-32 overflow-auto font-semibold select-text ai-answer rounded-box bg-secondary-content bg-opacity-85 text-secondary xl:pb-10">
        <span className="pr-2 text-secondary">&gt;</span>
        {result}
      </div>
      <div className="flex flex-1 w-full gap-1 rounded-md ai-form">
        <input
          type="text"
          placeholder="Tanya disini bro"
          className="w-full text-sm font-semibold input input-bordered text-primary xl:text-xl"
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
