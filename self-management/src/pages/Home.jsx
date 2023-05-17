import React from "react"
import Header from "../components/Header"
import JournalHome from "../journal/JournalHome"
import TodoHome from "../todo/TodoHome"

const Home = () => {
  return (
    <div className="min-h-screen ">
      <Header/>
      <div className="p-4 lg:flex lg:gap-x-10">
        <TodoHome />
        <JournalHome />
      </div>
    </div>
  )
}
export default Home