import React from "react"
import TodoHome from "./todo/TodoHome"
import Header from "./components/Header"
import JournalHome from "./journal/JournalHome"

const style = {
  bg:"min-h-screen w-full bg-zinc-800 text-zinc-200",
}

function App() {
  return (
    <div className={style.bg}>
      <Header/>
      <div className="p-4 lg:flex lg:gap-x-10">
        <TodoHome />
        <JournalHome />
      </div>
    </div>
  )
}

export default App
