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
    clientRef.current = mqtt.connect('wss://broker.emqx.io:8083/mqtt')
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
    <div className="box-border flex flex-col items-start justify-start h-full gap-5 pt-10 text-xl sensor-wrapper rounded-box text-secondary-content shadow-primary md:pt-4 xl:h-3/4 xl:pt-0">
      <div
        className="flex flex-col w-full h-full gap-5 sensor-text md:flex-row"
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
        className="flex flex-col w-full h-full gap-5 sensor-text md:flex-row"
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
        className="box-border flex-1 w-full px-10 py-8 shadow-sm sensor-chat bg-based-100 rounded-box shadow-primary"
      >
        <div className="flex justify-center w-full gap-5 py-3 controller-wrapper md:flex-col">
          <Relay todo={'1'} textButton="Turn On Relay" />
          <Relay todo={'0'} textButton="Turn Off Relay" />
        </div>
        <h1 className="py-3 text-xl font-bold text-center">
          IoT Control Panel
        </h1>
        <input
          type="text"
          placeholder="Type topic here"
          className="w-full font-semibold input input-bordered input-primary text-primary"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type message here"
          className="w-full my-5 font-semibold input input-bordered input-primary text-primary"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="w-full btn btn-primary"
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
