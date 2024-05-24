import { useEffect, useState } from 'react'
import mqtt from 'mqtt'

interface Message {
  temperature?: number | undefined
  humidity?: number | undefined
  ldrSensor?: number | undefined
  soil?: number | undefined
}

const MQTTComponent = () => {
  const [lastMessage, setLastMessage] = useState<Message>({})

  useEffect(() => {
    const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt')

    client.on('connect', () => {
      console.log('Connected to broker')
      client.subscribe('aven/data', (err) => {
        if (err) {
          console.error('Error subscribing to data:', err)
        } else {
          console.log('Subscribed to data')
        }
      })
    })

    client.on('message', (topic, message) => {
      try {
        const parsedMessage: Message = JSON.parse(message.toString())
        setLastMessage(parsedMessage)
      } catch (e) {
        console.error('Error parsing message:', e, 'from', topic)
      }
    })

    return () => {
      client.end()
    }
  }, [])

  console.log(lastMessage)
  return lastMessage
}

export default MQTTComponent
