import { useState, useRef, useEffect } from 'react'
import Stat from '../stats/Stat'
import Relay from '../utility/Relay'
import { gsap } from 'gsap'
import mqtt, { MqttClient } from 'mqtt'

interface SensorProps {
  sensor1?: string | number | undefined
  sensor2?: string | number | undefined
  sensor3?: string | number | undefined
  sensor4?: string | number | undefined
}

const StatSensor = ({ sensor1, sensor2, sensor3, sensor4 }: SensorProps) => {
  const [topic, setTopic] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [feedback, setFeedback] = useState<string>('')

  const clientRef = useRef<MqttClient | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    clientRef.current = mqtt.connect('wss://broker.emqx.io:8084/mqtt')
    clientRef.current.on('connect', () => {
      console.log('Connected to MQTT broker')
    })

    return () => {
      clientRef.current?.end()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const themeLtH = (sensor: string | number | undefined): string => {
    const sensorValue = sensor ? parseInt(sensor.toString()) : NaN
    if (!isNaN(sensorValue)) {
      if (sensorValue < 50) {
        return 'bg-[url("img/hujan.gif")]'
      } else if (sensorValue > 50) {
        return 'bg-[url("img/panas.gif")]'
      } else {
        return 'bg-[url("img/orang.gif")]'
      }
    }
    return 'bg-[url("img/kucing.gif")]'
  }

  const themeHtL = (sensor: string | number | undefined): string => {
    const sensorValue = sensor ? parseInt(sensor.toString()) : NaN
    if (!isNaN(sensorValue)) {
      if (sensorValue < 50) {
        return 'bg-[url("img/orang.gif")]'
      } else if (sensorValue > 50) {
        return 'bg-[url("img/hujan.gif")]'
      } else {
        return 'bg-[url("img/hujan.gif")]'
      }
    }
    return 'bg-[url("img/kucing.gif")]'
  }

  const sensorRef = useRef<HTMLDivElement>(null)
  const indicatorTopRef = useRef<HTMLDivElement>(null)
  const indicatorBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      sensorRef.current,
      { opacity: 0, x: -400 },
      { opacity: 1, x: 0, duration: 1 },
    )
    gsap.fromTo(
      indicatorTopRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1.5 },
    )
    gsap.fromTo(
      indicatorBottomRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 2 },
    )
  }, [])

  const sendData = () => {
    if (clientRef.current && topic && message) {
      clientRef.current.publish(topic, message, (err) => {
        if (err) {
          setFeedback('Failed to send data')
        } else {
          setFeedback('Data sent successfully!')
        }
        clearTimeout(timeoutRef.current!)
        timeoutRef.current = setTimeout(() => {
          setFeedback('')
        }, 500)
      })
    } else {
      setFeedback('Please provide both topic and message')
      clearTimeout(timeoutRef.current!)
      timeoutRef.current = setTimeout(() => {
        setFeedback('')
      }, 500)
    }
  }

  return (
    <div className="sensor-wrapper box-border flex h-full flex-col items-start justify-start gap-5 rounded-box pt-10 text-xl text-secondary-content shadow-primary md:pt-4 xl:h-3/4 xl:pt-0">
      <div
        className="sensor-text flex h-full w-full flex-col gap-5 md:flex-row"
        ref={indicatorTopRef}
      >
        <Stat addClass={`${themeHtL(sensor1)}`}>
          <h1 className="text-xl font-semibold">Temperature: {sensor1} ℃</h1>
        </Stat>
        <Stat addClass={`${themeLtH(sensor2)}`}>
          <h1 className="text-xl font-semibold">Humidity: {sensor2} %</h1>
        </Stat>
      </div>
      <div
        className="sensor-text flex h-full w-full flex-col gap-5 md:flex-row"
        ref={indicatorBottomRef}
      >
        <Stat addClass={`${themeLtH(sensor3)}`}>
          <h1 className="text-xl font-semibold">LDR Sensor: {sensor3} lux</h1>
        </Stat>
        <Stat addClass={`${themeHtL(sensor4)}`}>
          <h1 className="text-xl font-semibold">Soil Moisture: {sensor4} cm</h1>
        </Stat>
      </div>

      <div
        ref={sensorRef}
        className="sensor-chat bg-based-100 box-border w-full flex-1 rounded-box px-10 py-8 shadow-sm shadow-primary"
      >
        <div className="controller-wrapper flex w-full justify-center gap-5 py-3 md:flex-col">
          <Relay todo={'1'} textButton="Turn On Relay" />
          <Relay todo={'0'} textButton="Turn Off Relay" />
        </div>
        <h1 className="py-3 text-center text-xl font-bold">
          IoT Control Panel
        </h1>
        <input
          type="text"
          placeholder="Type topic here"
          className="input input-bordered input-primary w-full font-semibold text-primary"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type message here"
          className="input input-bordered input-primary my-5 w-full font-semibold text-primary"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          onClick={sendData}
        >
          Send Message
        </button>
        {feedback && (
          <div className="toast">
            <div className="alert alert-info">
              <span>{feedback}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatSensor
