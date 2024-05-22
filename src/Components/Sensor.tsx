import AI from './AI'
import StatSensor from './Sensors/StatSensor'

const Sensor = ({
  sensor1,
  sensor2,
  sensor3,
  sensor4,
}: {
  sensor1?: string | number | undefined
  sensor2?: string | number | undefined
  sensor3?: string | number | undefined
  sensor4?: string | number | undefined
}) => {
  return (
    <div className="sensors grid min-h-screen w-full grid-cols-1 items-center justify-center gap-5 px-12 xl:-mt-16 xl:grid-cols-2 xl:gap-5">
      <StatSensor
        sensor1={sensor1}
        sensor2={sensor2}
        sensor3={sensor3}
        sensor4={sensor4}
      ></StatSensor>
      <AI />
    </div>
  )
}

export default Sensor
