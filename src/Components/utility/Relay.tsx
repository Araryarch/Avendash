import { useState, useEffect } from 'react'
import mqtt from 'mqtt'

interface RelayProps {
  todo: string
  textButton: string
}

const Relay = ({ todo, textButton }: RelayProps) => {
  const [feedback, setFeedback] = useState('')
  const [client, setClient] = useState<mqtt.MqttClient | null>(null)

  useEffect(() => {
    const mqttClient = mqtt.connect('ws://broker.emqx.io:8083/mqtt')
    setClient(mqttClient)

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker')
    })

    mqttClient.on('error', (error) => {
      setFeedback(`MQTT connection error: ${error.message}`)
    })

    return () => {
      mqttClient.end()
    }
  }, [])

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback('')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [feedback])

  const sendData = (message: string) => {
    if (!message || typeof message !== 'string') {
      setFeedback('ngetik yang bener kocak')
      return
    }

    if (client) {
      client.publish('aven/relay', message, (error) => {
        if (error) {
          setFeedback('Relay Gak Nyala.')
        } else {
          setFeedback('Relay Nyala Cuy')
        }
      })
    } else {
      setFeedback('MQTT gak connect cuy')
    }
  }

  return (
    <div>
      <button onClick={() => sendData(todo)} className="btn btn-primary w-full">
        {textButton}
      </button>
      {feedback && (
        <div className="toast">
          <div className="alert alert-info">
            <span>{feedback}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Relay
