import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './styles/App.css'
import '@mantine/core/styles.css'
import { createTheme, MantineProvider } from '@mantine/core'
import AuthPage from './pages/authPage/AuthPage.tsx'

const theme = createTheme({
  /** Put your mantine theme override here */
})

function App() {
  return (
    // <div className='App'>
      <MantineProvider theme={theme}>
        <BrowserRouter>
            <Routes>
              {/* <Route path="/main" element={<MainPage/>} /> */}
              <Route path="/" element={<AuthPage/>} />
            </Routes>
          </BrowserRouter>
      </MantineProvider>
    // </div>
  )
}

export default App
