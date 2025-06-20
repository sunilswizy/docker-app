import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [username, setUsername] = useState('')

  const handleOnChange = (e) => {
    setUsername(e.target.value);
    updateUserName(e.target.value);
  };

  const updateUserName = async (username) => {
    await fetch('http://localhost:3000/data', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username
      })
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/data');
      const userData = await response.json();
      const { data, status } = userData;
      if(status) setUsername(data.username);
     }

     fetchData();
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input placeholder='Type Name' value={username} onChange={handleOnChange} />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
