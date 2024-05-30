import React from "react"
import {Routes,Route} from "react-router-dom"
import Signup from "./authentication/Signup"
import SignIn from "./authentication/SignIn"
import Home from "./components/Home"
import Projects from "./components/Projects"
import Services from "./components/Services"
function App() {
  return (
    <>
     <Routes>
     <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/services" element={<Services/>}/>
     </Routes>
    </>
  )
}

export default App
