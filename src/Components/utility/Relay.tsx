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
    const mqttClient = mqtt.connect('wss://broker.emqx.io:8084/mqtt')
    setClient(mqttClient)

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker')
    })

    mqttClient.on('error', (error) => {
      setFeedback(`MQTT connection error: ${error.message}`)
    })

    mqttClient.on('close', () => {
      console.log('MQTT connection closed')
      setFeedback('MQTT connection closed')
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
          setFeedback('Relay gak nyala.')
        } else {
          setFeedback('Relay berubah cuy')
        }
      })
    } else {
      setFeedback('MQTT gak connect cuy')
    }
  }

  return (
    <div>
      <button onClick={() => sendData(todo)} className="w-full btn btn-primary">
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
