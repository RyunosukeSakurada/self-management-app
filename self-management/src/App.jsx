import React from "react"
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "./firebase"
import Home from "./pages/Home"
import Login from "./pages/Login"


function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="bg-zinc-800 min-h-screen ">
      {user ? <Home /> : <Login/> }
    </div>
  )
}

export default App
