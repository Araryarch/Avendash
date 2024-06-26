import { useState, useEffect } from 'react'
import AI from './AI'
import StatSensor from './Sensors/StatSensor'

interface SensorProps {
  sensor1?: string | number
  sensor2?: string | number
  sensor3?: string | number
  sensor4?: string | number
}
const calculateBrightness = (ldrRawValue: number) => {
  const gamma = 0.7
  const rl10 = 50

  const ldrMappedValue = map(ldrRawValue, 4095, 0, 100000, 0)

  const voltage = (ldrMappedValue / 100000.0) * 5
  const resistance = (2000 * voltage) / (1 - voltage / 5)
  const brightness = Math.pow(
    (rl10 * 1e3 * Math.pow(10, gamma)) / resistance,
    1 / gamma,
  )

  return brightness
}

const map = (
  x: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number,
) => {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

const Sensor = ({ sensor1, sensor2, sensor3, sensor4 }: SensorProps) => {
  const [brightness, setBrightness] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (sensor3 !== undefined) {
      const brightnessValue = calculateBrightness(Number(sensor3) || 0)
      setBrightness(Math.ceil(brightnessValue))
      if (brightnessValue === 0) {
        setBrightness(Number(sensor3))
      }
    } else {
      setBrightness(undefined)
    }
  }, [sensor3])

  return (
    <div className="grid items-center justify-center w-full min-h-screen grid-cols-1 gap-5 px-12 sensors xl:-mt-16 xl:grid-cols-2 xl:gap-5">
      <StatSensor
        sensor1={sensor1}
        sensor2={sensor2}
        sensor3={brightness}
        sensor4={sensor4}
      />
      <AI />
    </div>
  )
}

export default Sensor
