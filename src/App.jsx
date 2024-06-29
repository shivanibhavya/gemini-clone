import React from 'react'
import SideBar from './components/sidebar/SideBar'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Main from './components/main/Main'
const App = () => {
  return (
    <>
      <SideBar />
      <Main />
    </>
  )
}

export default App