import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sensors from './Pages/Sensors'
import Hero from './Pages/Hero'
import MQTTComponent from './server/Mqtt'

const App = () => {
  const { temperature, humidity, ldrSensor, soil } = MQTTComponent()

  const applyCeil = (value: number | undefined) =>
    value !== undefined ? Math.ceil(value) : undefined

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/sensors"
          element={
            <Sensors
              sensor1={applyCeil(temperature)}
              sensor2={applyCeil(humidity)}
              sensor3={applyCeil(ldrSensor)}
              sensor4={applyCeil(soil)}
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
