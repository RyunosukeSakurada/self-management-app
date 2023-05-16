import React from "react"
import AddTodo from "./AddTodo"
import TodoList from "./TodoList"

const TodoHome = () => {
  return (
    <div className="bg-zinc-900 lg:w-1/4 p-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl">My Todo</div>
      </div>
      <AddTodo />
      <TodoList />
    </div>
  )
}
export default TodoHome