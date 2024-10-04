import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get("http://localhost:3000/")
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div>
        Heelo
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
