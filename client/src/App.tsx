import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './styles/App.css'
import '@mantine/core/styles.css'
import { createTheme, MantineProvider } from '@mantine/core'
import AuthPage from './pages/authPage/AuthPage.tsx'
import ServicePage from './pages/servicePage/ServicePage.tsx'

const theme = createTheme({
  /** Put your mantine theme override here */

})

function App() {
  return (
      <MantineProvider theme={theme}>
        <BrowserRouter>
            <Routes>
              <Route path={'/service'} element={<ServicePage/>} />
              <Route path={'/'} element={<AuthPage/>} />
            </Routes>
          </BrowserRouter>
      </MantineProvider>
  )
}

export default App
