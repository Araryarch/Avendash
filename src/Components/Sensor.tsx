import React from 'react'
import AI from './AI'
import StatSensor from './Sensors/StatSensor'

interface SensorProps {
  sensor1?: string | number
  sensor2?: string | number
  sensor3?: string | number
  sensor4?: string | number
}

const Sensor: React.FC<SensorProps> = ({
  sensor1,
  sensor2,
  sensor3,
  sensor4,
}) => {
  const calculateBrightness = (ldrRawValue: number) => {
    const gama = 0.7
    const rl10 = 50

    ldrRawValue = map(ldrRawValue, 4095, 0, 1024, 0)

    const voltage = (ldrRawValue / 1024.0) * 5
    const resistance = (2000 * voltage) / (1 - voltage / 5)
    const brightness = Math.pow(
      (rl10 * 1e3 * Math.pow(10, gama)) / resistance,
      1 / gama,
    )

    return brightness
  }

  const map = (
    x: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number,
  ): number => {
    return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }

  const brightness = Math.ceil(calculateBrightness(Number(sensor3) || 0))
  console.log(brightness)

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
