import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Sensor from '../Components/Sensor'

interface SensorProps {
  sensor1?: string | undefined | number
  sensor2?: string | undefined | number
  sensor3?: string | undefined | number
  sensor4?: string | undefined | number
}

const Sensors = ({ sensor1, sensor2, sensor3, sensor4 }: SensorProps) => {
  return (
    <>
      <Navbar addClass="" />
      <Sensor
        sensor1={sensor1}
        sensor2={sensor2}
        sensor3={sensor3}
        sensor4={sensor4}
      />
      <Footer addClass="mt-10" />
    </>
  )
}

export default Sensors
