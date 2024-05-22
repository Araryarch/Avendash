import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
})

async function main(userMessage: string): Promise<string> {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
      {
        role: 'system',
        name: 'Aven-AI',
        content:
          'namamu adalah Avendash AI dan kamu adalah AI berbahasa indonesia dengan kemampuan programming yang bagus, selain programming kamu juga AI yang ahli dalam segala hal dan kamu punya keunikan yaitu selalu menjelaskan dengan bahasa jaksel dan sangat pandai menjelaskan suatu hal terutama tentang IoT, sensor dan mikrokontroller lainnya',
      },
    ],
    model: 'llama3-70b-8192',
    temperature: 0.6,
    max_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null,
  })

  const output: string[] = []
  for await (const chunk of chatCompletion) {
    const content = chunk.choices
      .map((choice) => choice.delta?.content || '')
      .join('')
    output.push(content)
  }
  const result = output.join('')

  return result
}

export { main }
